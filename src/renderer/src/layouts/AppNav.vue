<template>
  <div>
    <div class="row-a p-1 space drageable">
      <div class="row-a gap">
        <img :src="logoUrl" class="w-max-30">
        <p class="app-text-secondary">PortBar</p>
        <button-primary
          v-for="(item, index) in ports"
          :key="index"
          class="btn-custom-r chip"
          @click="port = item.id"
          :class="{ 'active-port': port == item.id }"
          @contextmenu.prevent="handlePortRightClick($event, item)"
        >
          <span>{{ item.label }}</span>
          <span class="app-color-accent">{{ item.id }}</span>
        </button-primary>
        <button-primary icon="ion:add" class="btn-custom" @click="showAddPortModal = true" />
      </div>
      <div class="row-a gap">
        <button-primary
          icon="flowbite:minus-outline"
          class="btn-custom hover-accent"
          @click="store.minimize"
        />
        <button-primary
          icon="solar:maximize-square-minimalistic-broken"
          class="btn-custom hover-accent"
          @click="store.toggleMaximize"
        />
        <button-primary
          icon="iconamoon:close-bold"
          class="btn-custom hover-danger"
          @click="store.close"
        />
      </div>
    </div>
    <nav class="row-a gap p-0-1">
      <div class="left row-a gap">
        <button-primary
          icon="ion:chevron-back"
          class="btn-custom hover-accent"
          @click="store.goBack"
        />
        <button-primary
          icon="ion:chevron-forward"
          class="btn-custom hover-accent"
          @click="store.goForward"
        />
        <button-primary
          icon="tabler:reload"
          class="btn-custom hover-accent"
          @click="store.reload"
        />
        <button-primary
          icon="material-symbols:reset-iso"
          class="btn-custom hover-accent"
          @click="store.hardReload()"
        />
        <!-- Editable only after the localhost:PORT part -->
        <form @submit.prevent="store.loadCustomUrl(store.url + store.currentPath)">

          <input
            v-if="currentUrl"
            v-model="store.currentPath"
            class="url-input"
          />
        </form>

        <div v-if="loading">
          <iconify-icon icon="line-md:loading-alt-loop" class="h4" />
        </div>
      </div>

      <input ref="input" v-model="port" placeholder="PORT" class="inp" />

      <div class="right">
        <button-primary
          icon="solar:code-bold-duotone"
          class="btn-custom hover-accent"
          @click="store.openDevTools"
        />
      </div>
    </nav>
    <add-port-modal v-model="showAddPortModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAppStore } from '@renderer/stores/AppStore'
import ButtonPrimary from '@renderer/components/ButtonPrimary.vue'
import { storeToRefs } from 'pinia'
import AddPortModal from '@renderer/components/AddPortModal.vue'
import IconifyIcon from '@renderer/components/IconifyIcon.vue'
import logoUrl from '../../../../resources/logo.png'

const port = ref(localStorage.getItem('lastPort') || '5173')
const store = useAppStore()
const { ports, currentUrl, loading } = storeToRefs(store)
const input = ref<HTMLInputElement>()
const load = (): void => {
  if (port.value.length < 4) return
  store.loadApp(port.value)
  input.value?.blur()
}

watch(port, load)

const showAddPortModal = ref(false)

// Renderer
const handlePortRightClick = (event: MouseEvent, item: any) => {
  event.preventDefault()

  const menuTemplate = [
    { label: 'Delete ', action: 'remove', portId: item.id },
    { label: 'Rename', action: 'rename', portId: item.id },
  ]

  window.api.showContextMenu(menuTemplate)
}

window.api.onContextMenuAction((action, portId) => {
  if (action === 'remove') {
    store.removePort(portId)
  }
  if (action === 'rename') {
    //
  }
})
</script>

<style scoped lang="scss">
nav {
  height: var(--nav-height);
}

.left,
.right {
  flex: 1; /* take equal space */
  display: flex;
  align-items: center;
}

.left {
  justify-content: flex-start;
}

.right {
  justify-content: flex-end;
}

.inp {
  flex: 0 0 auto; /* keep natural size */
  margin: 0 auto;
  background-color: var(--paper);
  color: var(--text-light);
  border: unset;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  text-align: center;
  letter-spacing: 0.6rem;
  width: 120px !important;
  font-size: 1.2rem;
}

.url {
  background-color: var(--paper);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  text-align: center;
}

.hover-danger:hover {
  background-color: var(--color-danger);
}

.hover-accent:hover {
  background-color: var(--accent-color);
}

.chip {
  border: 1px solid transparent;
}

.active-port {
  border-color: var(--accent-color);
}
.url-input {
  flex: 1;
  background-color: var(--paper);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  border: unset;
  color: var(--text-light);
  font-size: 0.9rem;
}
@media screen and (max-width: 880px){
  .chip:not(.active-port){
    display: none;
  }

  .left,
  .right {
    flex: unset;
  }
  .left{ order: 1; }
  .right{
    order: 2
  }
  .inp{
    display: none;
  }
}
.drageable{
  -webkit-app-region: drag;
  button,
  input{
    -webkit-app-region: no-drag;
  }
}
</style>
