<template>
  <component
    :is="tag"
    class="btn"
    :class="[
      variant ? `btn--${variant}` : '',
      size    ? `btn--${size}`    : 'btn--md',
      { 'btn--full': full, 'btn--icon': iconOnly },
    ]"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    v-bind="$attrs"
  >
    <!-- Leading icon slot -->
    <slot name="icon-left" />

    <!-- Default label slot -->
    <slot />

    <!-- Trailing icon slot -->
    <slot name="icon-right" />
  </component>
</template>

<script setup>
import '@/styles/ui/Button.css'

defineProps({
  /**
   * HTML element or component to render: 'button' | 'a' | 'router-link'
   */
  tag: {
    type: String,
    default: 'button',
  },
  /**
   * Style variant: 'primary' | 'outline' | 'ghost' | 'danger'
   */
  variant: {
    type: String,
    default: 'primary',
    validator: v => ['primary', 'outline', 'ghost', 'danger'].includes(v),
  },
  /**
   * Size modifier: 'sm' | 'md' | 'lg'
   */
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v),
  },
  /** Stretch to full container width */
  full: {
    type: Boolean,
    default: false,
  },
  /** Square icon-only button */
  iconOnly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
})
</script>