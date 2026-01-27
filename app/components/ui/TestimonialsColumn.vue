<template>
  <div :class="cn('', $attrs.class as string)">
    <div
      :style="{ '--duration': `${duration}s` }"
      class="testimonials-column flex flex-col gap-6 pb-6"
    >
      <template v-for="(_, index) in Array(2).fill(0)" :key="index">
        <div
          v-for="(testimonial, i) in testimonials"
          :key="`${index}-${i}`"
          class="p-10 rounded-3xl border border-neutral-800/60 bg-[#1a1a1a] shadow-lg shadow-[#c9a962]/10 max-w-xs w-full"
        >
          <div class="text-neutral-300">{{ testimonial.text }}</div>
          <div class="flex items-center gap-2 mt-5">
            <img
              :width="40"
              :height="40"
              :src="testimonial.image"
              :alt="testimonial.name"
              class="h-10 w-10 rounded-full"
            />
            <div class="flex flex-col">
              <div class="font-medium tracking-tight leading-5 text-[#c9a962]">{{ testimonial.name }}</div>
              <div class="leading-5 opacity-60 tracking-tight text-neutral-400">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Testimonial } from '../../../shared/types/Testimonial'
import { cn } from '../../utils/cn'

interface Props {
  testimonials: Testimonial[]
  duration?: number
}

withDefaults(defineProps<Props>(), {
  duration: 10,
})
</script>

<style scoped>
.testimonials-column {
  animation: scroll-up linear infinite;
  animation-duration: var(--duration, 10s);
}

@keyframes scroll-up {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
}
</style>
