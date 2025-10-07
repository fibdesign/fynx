<template>
  <p><b>subject:</b> {{ email.subject }}</p>
  <p><b>From:</b> {{ email.from }}</p>
  <p><b>To:</b> {{ email.to }}</p>
  <p><b>Date:</b> {{ new Date(email.date) }}</p>
</template>

<script setup lang="ts">
defineProps<{
  email: any
}>()
</script>

<style scoped lang="scss">

</style>
