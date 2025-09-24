<template>
  <button
    v-bind="$attrs"
    :type="submit ? 'submit' : 'button'"
    class="row-c"
    :class="{ 'icon-btn': !$slots.default && icon, 'btn-disabled': disabled || loading }"
  >
    <span v-if="loading">...</span>
    <span v-else class="row-c gap">
      <iconify-icon v-if="icon" :icon="icon" />
      <slot v-if="$slots.default" />
      <span v-else-if="!icon && submit">submit</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import IconifyIcon from '@renderer/components/IconifyIcon.vue'

interface PPrimaryButton extends /* @vue-ignore */ ButtonHTMLAttributes {
  icon?: string
  loading?: boolean
  disabled?: boolean
  submit?: boolean
}

defineProps<PPrimaryButton>()
</script>

<style scoped lang="scss">
button {
  --custom-btn-bg: var(--primary-color);
  --custom-btn-bg-active: var(--primary-color-dark);
  --custom-btn-color: var(--primary-color-text);
  --custom-btn-color-active: var(--primary-color-text);

  &:disabled,
  &.disabled {
    pointer-events: none;
    filter: grayscale(100%);
  }
}
</style>
