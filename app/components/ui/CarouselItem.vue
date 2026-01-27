<template>
  <div
    ref="itemRef"
    role="group"
    aria-roledescription="slide"
    :class="cn('min-w-0 shrink-0 grow-0 basis-full', orientation === 'horizontal' ? 'pl-4' : 'pt-4', $attrs.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { cn } from '../../utils/cn'

interface CarouselContext {
  orientation: 'horizontal' | 'vertical'
}

const context = inject<CarouselContext>('carousel')
if (!context) {
  throw new Error('CarouselItem must be used within a Carousel component')
}

const orientation = computed(() => context.orientation)
</script>
