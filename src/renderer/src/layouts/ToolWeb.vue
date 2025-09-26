<template>
  <div class="tool-web row gap">
    <div class="menu column align-center gap">
      <button-primary
        v-for="tool in tools"
        :key="tool.link"
        class="btn-custom-r hover-accent"
        :icon="tool.icon"
        :title="tool.title"
        @click="setTool(tool.link)"
      />
    </div>
    <div v-if="loading" class="toolview row-c">
      <iconify-icon icon="line-md:loading-alt-loop" class="h1" />
    </div>
    <webview
      v-show="!loading && showToolWeb"
      id="webviewTool"
      class="toolview"
      :src="tool"
      allowpopups
    >
    </webview>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@renderer/stores/AppStore.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import ButtonPrimary from '@renderer/components/ButtonPrimary.vue'
import type { WebviewTag } from 'electron'
import IconifyIcon from '@renderer/components/IconifyIcon.vue'

const store = useAppStore()
const { showToolWeb } = storeToRefs(store)

const tools = [
  {
    title: 'Iconify',
    icon: 'simple-icons:iconify',
    link: 'https://icon-sets.iconify.design',
  },
  {
    title: 'Regex101',
    icon: 'lucide:regex',
    link: 'https://regex101.com',
  },
  {
    title: 'Can I Use',
    icon: 'line-md:question',
    link: 'https://caniuse.com',
  },
  {
    title: 'Dev Docs',
    icon: 'teenyicons:doc-outline',
    link: 'https://devdocs.io',
  },
  {
    title: 'Lorem Ipsum',
    icon: 'carbon:character-sentence-case',
    link: 'https://loremipsum.io/generator',
  },
]

const tool = ref<string>(tools[0].link)

const setTool = (link: string) => {
  tool.value = link
}
const loading = ref(false)
onMounted(() => {
  const webview = document.getElementById('webviewTool') as WebviewTag
  if (!webview) return

  webview.addEventListener('did-start-loading', () => (loading.value = true))
  webview.addEventListener('did-stop-loading', () => (loading.value = false))
})
</script>

<style scoped lang="scss">
.toolview {
  width: 400px;
  border-radius: 20px;
  overflow: clip;
}

.menu {
  width: 40px;
}

.tool-web {
  width: 450px;
  height: 100%;
}

.w-max-30 {
  max-width: 30px;
}

webview {
  width: 100%;
  height: 100%;
}

.hover-accent:hover {
  background-color: var(--accent-color);
}
</style>
