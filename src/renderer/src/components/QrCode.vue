<template>
  <img :src="qrcode" alt="QR Code" />
</template>

<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { shallowRef } from 'vue'

const {value} = defineProps<{
  value: string
}>()

const text = shallowRef(value)
const qrcode = useQRCode(text)
</script>

<style scoped lang="scss"></style>
