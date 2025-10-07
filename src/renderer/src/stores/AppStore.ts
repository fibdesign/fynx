import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { WebviewTag } from 'electron'

export const useAppStore = defineStore('app', () => {
  const showToolWeb = ref(false)
  const mobileScreen = ref(false)
  const showEmailPage = ref(false)
  const title = ref('')
  const favicon = ref('')

  const webEl = ref<WebviewTag | undefined>()
  const toolEl = ref<WebviewTag | undefined>()
  const setToolView = (view: WebviewTag) => {
    toolEl.value = view
  }
  const port = ref(localStorage.getItem('lastPort') || '5173')
  const url = computed(() => `http://localhost:${port.value}`)

  const setWebview = (view: WebviewTag): void => {
    webEl.value = view
    view.addEventListener('did-navigate', (e: any) => {
      currentUrl.value = e.url
      currentPath.value = currentUrl.value.replaceAll(url.value, '')
    })

    view.addEventListener('did-navigate-in-page', (e: any) => {
      currentUrl.value = e.url
      currentPath.value = currentUrl.value.replaceAll(url.value, '')
    })

    view.addEventListener('did-start-loading', () => loading.value = true)
    view.addEventListener('did-stop-loading', () => {
      loading.value = false
    })
    view.addEventListener('page-title-updated', (event:any) => {
      title.value = event?.title ?? ''
      view
        .executeJavaScript(
          `
              (() => {
                const icon = document.querySelector('link[rel*="icon"]')
                return icon ? icon.href : '/favicon.ico'
              })()
            `,
        )
        .then((url) => {
          favicon.value = url
        })
    })
    view.addEventListener('page-favicon-updated', (event:any) => {
      console.error(event.favicons)
    //   favicon.value = event.favicons[0] ?? ''
    })
  }
  const reload = () => webEl.value?.reload()
  const hardReload = () => webEl.value?.reloadIgnoringCache()
  const goBack = () => webEl.value?.canGoBack() && webEl.value.goBack()
  const goForward = () => webEl.value?.canGoForward() && webEl.value.goForward()
  const openDevTools = () => {
    if (!webEl.value) return;
    window.api.openDevTools(webEl.value.getWebContentsId(), 'right')
  }
  const toggleMaximize = () => window.api.toggleMaximize()
  const minimize = () => window.api.minimize()
  const close = () => window.api.close()

  const loading = ref(false)
  const unreachable = ref(false)

  const loadApp = async (entryPort?: string): Promise<void> => {
    if (!webEl.value) return
    await webEl.value.loadURL('about:blank')
    loading.value = true
    unreachable.value = false

    if (entryPort) port.value = entryPort
    localStorage.setItem('lastPort', port.value)

    webEl.value.clearHistory()
    await webEl.value.loadURL(url.value)
    loading.value = false
  }
  const defaultPorts:any[] = [
    { id: '5173', label: 'vite' },
    { id: '3000', label: 'node' },
    { id: '4200', label: 'angular' },
    { id: '8000', label: 'laravel' },
  ]
  const storedPorts = JSON.parse(localStorage.getItem('ports') || 'null') || defaultPorts
  const ports = ref<any[]>(storedPorts)
  const addNewPort = (_port: string, _label: string) => {
    if (!ports.value.find(p => p.id === _port)) {
      const newPorts = [...ports.value, { id: _port, label: _label }] // make a plain copy
      ports.value.push({ id: _port, label: _label })
      localStorage.setItem('ports', JSON.stringify(newPorts))
    }
  }
  const removePort = (id:string) => {
    const newPorts = ports.value.filter(p => p.id !== id)
    ports.value = newPorts
    localStorage.setItem('ports', JSON.stringify(newPorts))
  }
  const loadCustomUrl = async (customUrl: string): Promise<void> => {
    if (!webEl.value) return
    loading.value = true
    unreachable.value = false

    const urlToLoad = customUrl.trim()

    await webEl.value.loadURL(urlToLoad)
    currentUrl.value = urlToLoad
    loading.value = false
  }
  const currentPath = ref('')
  const currentUrl = ref('')
  return {
    port,
    url,
    loadApp,
    setWebview,
    reload,
    goBack,
    goForward,
    openDevTools,
    toggleMaximize,
    minimize,
    close,
    loading,
    unreachable,
    ports,
    addNewPort,
    removePort,
    currentUrl,
    hardReload,
    loadCustomUrl,
    currentPath,
    showToolWeb,
    mobileScreen,
    setToolView,
    title,
    favicon,
    showEmailPage,
  }
})
