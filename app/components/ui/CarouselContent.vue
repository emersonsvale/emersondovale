<template>
  <div ref="emblaRef" class="overflow-hidden">
    <div
      :class="cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', $attrs.class)"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { cn } from '../../utils/cn'

interface CarouselContext {
  emblaRef: any
  orientation: 'horizontal' | 'vertical'
}

const context = inject<CarouselContext>('carousel')
if (!context) {
  throw new Error('CarouselContent must be used within a Carousel component')
}

const orientation = computed(() => context.orientation)
const emblaRef = context.emblaRef
</script>
