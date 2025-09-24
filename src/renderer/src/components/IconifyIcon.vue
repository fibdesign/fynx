<template>
  <div class="row-c" :class="{ flip: flip }">
    <Icon :icon="icon" :color="color" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { toRefs } from 'vue'

const props = defineProps<{
  icon: string
  flip?: boolean
  color?: string
}>()
const { icon } = toRefs(props)
</script>

<style scoped lang="scss">
.flip {
  transform: scaleX(-1);
}
</style>
