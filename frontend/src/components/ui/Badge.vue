<template>
  <span
    class="badge"
    :class="[
      variant ? `badge--${variant}` : '',
      size    ? `badge--${size}`    : '',
    ]"
  >
    <span v-if="dot" class="badge__dot" aria-hidden="true"></span>
    <slot />
  </span>
</template>

<script setup>
import '@/styles/ui/Badge.css'

defineProps({
  /**
   * Visual variant: 'primary' | 'success' | 'warning' | 'neutral' | 'danger'
   */
  variant: {
    type: String,
    default: 'neutral',
    validator: v => ['primary', 'success', 'warning', 'neutral', 'danger'].includes(v),
  },
  /**
   * Size modifier: 'sm' | 'lg' (default is base)
   */
  size: {
    type: String,
    default: null,
    validator: v => ['sm', 'lg'].includes(v),
  },
  /**
   * Show a pulsing dot inside the badge (e.g. "Available Now")
   */
  dot: {
    type: Boolean,
    default: false,
  },
})
</script>