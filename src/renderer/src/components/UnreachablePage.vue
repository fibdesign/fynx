<template>
  <div class="column-c gap-20 h-100">
    <img :src="logoUrl" class="w-max-200">
    <p class="h6 text-light app-text-secondary">Cannot reach port <span class="app-color-accent">{{ port }}</span>. Did you start the app?</p>
    <button-primary class="btn-custom-r row-c gap-5" icon="tabler:reload"
            @click="store.reload"> retry
    </button-primary>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@renderer/stores/AppStore'
import { storeToRefs } from 'pinia'

import logoUrl from '../../../../resources/404.png'
import ButtonPrimary from '@renderer/components/ButtonPrimary.vue'

const store = useAppStore()
const { port } = storeToRefs(store)
</script>

<style scoped lang="scss">

</style>
