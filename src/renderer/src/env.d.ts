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
      readLastEmail: () => Promise<any>,
      showContextMenu: (_:any) => void,
      setToolView: (id:number) => void,
      onContextMenuAction: any,
      getLocalIp: () => string,
    }
  }
}
