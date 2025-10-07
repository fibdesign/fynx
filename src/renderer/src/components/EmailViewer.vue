<template>
  <div v-html="email.html || email.text" class="round-20 over-hidden" />
</template>

<script setup lang="ts">
defineProps<{
  email: any
}>()
</script>

<style scoped lang="scss">
.over-hidden{
  overflow: clip;
}
</style>
