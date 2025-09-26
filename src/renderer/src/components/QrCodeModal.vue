<template>
  <transition name="transition-fade">
    <div v-if="show" class="modal">
      <div ref="target" class="content">
        <p class="f-center h5">{{ link }}</p>
        <p class="f-center mb-2 app-text-secondary">
          open in other devices that are in the same network
        </p>
        <qr-code :value="link" class="qr-image" />
        <p class="mt-2 app-text-secondary">
          Tip: Start your server with network access enabled so other devices can open it.
          <a
            href="https://fynx.fibdesign.ir/features/qr-code#network"
            target="_blank"
            class="app-color-accent"
            >learn more</a
          >
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useAppStore } from '@renderer/stores/AppStore.js'
import { storeToRefs } from 'pinia'
import QrCode from '@renderer/components/QrCode.vue'

const appStore = useAppStore()
const { port } = storeToRefs(appStore)

const show = defineModel<boolean>({ default: false })
const IP = ref<string>()
const target = useTemplateRef<HTMLElement>('target')

const link = computed((): string => `http://${IP.value}:${port.value}`)

onClickOutside(target, () => {
  show.value = false
})

onMounted(async () => {
  IP.value = await window.api.getLocalIp()
})
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000080;
  backdrop-filter: blur(4px);
  z-index: 3;
}

.content {
  padding: 1rem;
  background-color: var(--background);
  width: 400px;
  border-radius: 20px;
}
</style>
