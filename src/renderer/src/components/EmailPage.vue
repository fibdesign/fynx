<template>
  <div v-if="email" class="row">
    <div class="xcol-info">
      <email-meta :email="email"/>
    </div>
    <div class="xcol-body">
      <email-viewer :email="email"/>
    </div>
  </div>
  <p v-else>No email received yet.</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EmailMeta from '@renderer/components/EmailMeta.vue'
import EmailViewer from '@renderer/components/EmailViewer.vue'

const email = ref<any>(null)

async function loadEmail() {
  email.value = await window.api.readLastEmail()
}

onMounted(loadEmail)
</script>

<style scoped lang="scss">
.row {
  width: 100%;
  height: 100%;
}
</style>
