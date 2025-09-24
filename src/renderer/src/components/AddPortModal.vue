<template>
  <transition name="transition-fade">
    <div v-if="show" class="modal">
      <div class="content" ref="target">
        <p class="f-center h5 mb-2">Add New Port</p>
        <form class="column gap" @submit.prevent="submit">
          <input type="text" class="form" v-model="data.label" placeholder="LABEL" />
          <input type="text" class="form" placeholder="PORT" v-model="data.port" />
          <span class="app-text-disabled">example: 3000</span>
          <button-secondary
            submit
            class="btn-custom-r-block"
            :disabled="data.label.length == 0 || data.port.length == 0"
          />
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import ButtonSecondary from '@renderer/components/ButtonSecondary.vue'
import { useAppStore } from '@renderer/stores/AppStore.js'
import { ref, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

const data = ref({
  port: '',
  label: '',
})

const store = useAppStore()

const submit = () => {
  store.addNewPort(data.value.port, data.value.label)
  show.value = false
}

const show = defineModel({ default: false })

const target = useTemplateRef<HTMLElement>('target')
onClickOutside(target, () => {
  show.value = false
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
}

.content {
  padding: 1rem;
  background-color: var(--background);
  min-width: 400px;
  border-radius: 20px;
}

input {
  background-color: var(--paper);
  color: var(--text-light);
  border: unset;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  text-align: center;
  letter-spacing: 1rem;
}
</style>
