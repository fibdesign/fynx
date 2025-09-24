import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import * as http from 'node:http'

const api = {
  loadURL: (url: string) => ipcRenderer.send('load-url', url),
  openDevTools: (webContentId: number, mode?: 'right' | 'bottom' | 'detach') => ipcRenderer.send('open-devtools', webContentId, mode),
  toggleMaximize: () => ipcRenderer.send('toggleMaximize'),
  minimize: () => ipcRenderer.send('minimize'),
  close: () => ipcRenderer.send('close'),
  ping: (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        const req = http.get(url, { timeout: 2000 }, (res) => {
          res.destroy() // we don’t need body
          resolve(true)
        })
        req.on('error', () => resolve(false))
        req.on('timeout', () => {
          req.destroy()
          resolve(false)
        })
      } catch {
        resolve(false)
      }
    })
  },
  showContextMenu: (template: any) => ipcRenderer.send('show-context-menu', template),
  onContextMenuAction: (callback: (action: string, portId: string) => void) =>
    ipcRenderer.on('context-menu-action', (_event, action, portId) => callback(action, portId)),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
