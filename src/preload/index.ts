import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import * as http from 'node:http'
import os from 'os';
import fs from 'fs'
import path from 'path'

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
  getLocalIp: (): string => {
    const interfaces = os.networkInterfaces();
    let addr = '127.0.0.1'
    for (const name of Object.keys(interfaces)) {
      if (!interfaces[name]) return '127.0.0.1';
      for (const net of interfaces[name]) {
        // Skip over internal (127.0.0.1) and non-IPv4 addresses
        if (net.family === 'IPv4' && !net.internal) {
          addr = net.address;
        }
      }
    }

    return addr;
  },
  readLastEmail: () => {
    const emailFile = path.resolve('./email/last-email.json')
    try {
      const data = fs.readFileSync(emailFile, 'utf8')
      ipcRenderer.send('reset-email-count')
      return JSON.parse(data)
    } catch {
      return null
    }
  }
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
