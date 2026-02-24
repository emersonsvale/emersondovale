<template>
  <div :class="cn('', $attrs.class as string)">
    <div
      :style="{ '--duration': `${duration}s` }"
      class="testimonials-column flex flex-col gap-5 pb-5"
    >
      <template v-for="(_, index) in Array(2).fill(0)" :key="index">
        <div
          v-for="(testimonial, i) in testimonials"
          :key="`${index}-${i}`"
          class="relative p-7 rounded-2xl border border-white/[0.06] bg-[var(--c-surface)] max-w-xs w-full transition-colors duration-300 hover:border-[var(--c-gold)]/20"
        >
          <!-- Quote mark -->
          <div class="absolute top-4 right-5 text-4xl font-serif text-[var(--c-gold)]/10 leading-none select-none pointer-events-none" aria-hidden="true">"</div>

          <div class="text-sm leading-[1.7] text-[var(--c-text-secondary)]">{{ testimonial.text }}</div>
          <div class="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.04]">
            <img
              :width="36"
              :height="36"
              :src="testimonial.image"
              :alt="testimonial.name"
              @error="onImageError"
              class="h-9 w-9 rounded-full object-cover ring-1 ring-white/[0.06]"
            />
            <div class="flex flex-col">
              <div class="text-sm font-semibold tracking-tight leading-5 text-white" style="font-family: var(--font-heading)">{{ testimonial.name }}</div>
              <div class="text-xs leading-5 text-[var(--c-text-muted)] tracking-tight">{{ testimonial.role }}</div>
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

const onImageError = (event: Event) => {
  const element = event.target as HTMLImageElement | null
  if (!element) return

  if (!element.dataset.fallbackApplied) {
    element.dataset.fallbackApplied = 'true'
    const name = element.alt?.trim() || 'User'
    element.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a1a1a&color=c9a962&size=160`
  }
}
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
