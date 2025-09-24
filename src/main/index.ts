import { app, BrowserWindow, ipcMain, shell, screen, Menu, session, webContents } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/logo.png?asset'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 400,
    minWidth: 400,
    height: screen.getPrimaryDisplay().size.height,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      webviewTag: true,
    },
  })

  mainWindow.maximize()
  ipcMain.on('load-url', (_event, url: string) => {
    mainWindow.webContents.loadURL(url)
  })
  ipcMain.on(
    'open-devtools',
    (_event, webContentId: number, mode?: 'right' | 'bottom' | 'detach') => {
      const content = webContents.fromId(webContentId)
      if (!content) return;
      const webC = BrowserWindow.fromWebContents(content)?.webContents;
      if(!webC) return;
      webC.isDevToolsOpened()
        ? webC.closeDevTools()
        : webC.openDevTools({ mode: mode || 'detach' })
    },
  )

  ipcMain.on('toggleMaximize', () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  })
  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })
  ipcMain.on('close', () => {
    mainWindow.close()
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  ipcMain.on('show-context-menu', (event, template) => {
    const menu = Menu.buildFromTemplate(
      template.map((item: any) => ({
        label: item.label,
        click: () => {
          event.sender.send('context-menu-action', item.action, item.portId)
        },
      }))
    )
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) menu.popup({ window: win })
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  const ses = session.fromPartition('persist:jsonview'); // Use custom session
  ses.webRequest.onHeadersReceived((details, callback) => {
    const headers = details.responseHeaders || {};
    const contentType = headers['content-type'] || headers['Content-Type'];

    if (Array.isArray(contentType) && contentType.some(ct => ct.includes('application/json'))) {
      // Replace JSON content type with plain text
      headers['content-type'] = ['text/plain'];
      headers['Content-Type'] = ['text/plain'];
    }

    callback({ responseHeaders: headers });
  });
  electronApp.setAppUserModelId('ir.fibdesign.fynx')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
