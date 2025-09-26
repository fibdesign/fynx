/// <reference types="vite/client" />
export {}

declare global {
  interface Window {
    api: {
      loadURL: (url: string) => void,
      ping: (url: string) => Promise<boolean>,
      openDevTools: (webContentId: number, mode: string) => void,
      toggleMaximize: () => void,
      minimize: () => void,
      close: () => void,
      showContextMenu: (_:any) => void,
      onContextMenuAction: any,
      getLocalIp: () => string,
    }
  }
}
