<template>
  <div class="MainApp platinum">
    <app-nav />
    <main class="row gap">
      <tool-web v-if="!!showToolWeb" />
      <main-web v-if="mobileScreen" class="main-web" :class="{'mobile-horizontal': mobileScreen}" />
      <main-web class="main-web" :class="{'mobile': mobileScreen}" />
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
const { showToolWeb, mobileScreen } = storeToRefs(store)
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
  &.mobile {
    flex: unset;
    max-width: 400px;
    max-height: 800px;
    margin: auto;

    &-horizontal{
      max-width: 800px;
      max-height: 400px;
      margin: auto;
    }
  }
}
</style>
