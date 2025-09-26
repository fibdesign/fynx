<template>
  <div class="MainApp platinum">
    <app-nav />
    <main class="row gap">
      <tool-web v-if="!!showToolWeb" />
      <main-web class="main-web" />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNav from '@renderer/layouts/AppNav.vue'
import MainWeb from '@renderer/layouts/MainWeb.vue'
import ToolWeb from '@renderer/layouts/ToolWeb.vue'
import { useAppStore } from '@renderer/stores/AppStore.js'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { showToolWeb } = storeToRefs(store)
</script>

<style scoped lang="scss">
$padding: 20px;
main {
  width: calc(100vw - $padding);
  height: calc(100vh - (var(--nav-height) * 2) - $padding);
  margin: auto;
}
.main-web{
  flex: 1;
}
</style>
