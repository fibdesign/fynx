<template>
  <div class="MainApp platinum">
    <app-nav />
    <main>
      <div v-if="loading" class="h-100 h-100 row-c">
        <iconify-icon icon="line-md:loading-alt-loop" class="h1" />
      </div>
      <unreachable-page v-else-if="unreachable" />
      <webview
        v-show="!showJSON"
        id="webview"
        :src="url"
        allowpopups
        partition="persist:jsonview"
        @did-fail-load="unreachable = true"
        @dom-ready="handleDomReady"
      ></webview>
      <json-viewer v-if="showJSON" :json="jsonContent" />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNav from '@renderer/layouts/AppNav.vue'
import { onMounted, ref } from 'vue'
import { useAppStore } from '@renderer/stores/AppStore'
import type { WebviewTag } from 'electron'
import { storeToRefs } from 'pinia'
import IconifyIcon from '@renderer/components/IconifyIcon.vue'
import UnreachablePage from '@renderer/components/UnreachablePage.vue'
import JsonViewer from '@renderer/components/JsonViewer.vue'

const store = useAppStore()
const { url, loading, unreachable } = storeToRefs(store)

onMounted(async () => {
  const webview = document.getElementById('webview') as WebviewTag
  if (!webview) return
  store.setWebview(webview)
})
const showJSON = ref(false)
const jsonContent = ref('')
const handleDomReady = async () => {
  const webview = document.getElementById('webview') as WebviewTag
  if (!webview) return

  const content = await webview.executeJavaScript('document.documentElement.outerText')

  const trimmed = content.trim()
  try {
    JSON.parse(trimmed)
    jsonContent.value = trimmed
    showJSON.value = true
  } catch (err) {
    console.warn('Invalid JSON:', err)
    showJSON.value = false
  }
}

</script>

<style scoped lang="scss">
$padding: 20px;
main {
  width: calc(100vw - $padding);
  height: calc(100vh - (var(--nav-height) * 2) - $padding);
  margin: auto;
  border-radius: 20px;
  overflow: clip;
}

webview {
  width: 100%;
  height: 100%;
}
</style>
