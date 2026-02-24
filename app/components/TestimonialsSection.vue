<template>
  <section
    ref="sectionRef"
    class="bg-[var(--c-bg)] py-20 md:py-32 relative overflow-hidden"
  >
    <!-- Subtle background glow -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_30%,rgba(201,169,98,0.04)_0%,transparent_70%)]"
      aria-hidden="true"
    />

    <div class="container z-10 mx-auto relative">
      <div
        ref="headerRef"
        class="reveal flex flex-col items-center justify-center max-w-[540px] mx-auto"
      >
        <div class="section-label">Testimonials</div>

        <h2 class="section-heading mt-4 text-center">
          What people say
        </h2>
        <p class="text-center mt-4 text-[var(--c-text-secondary)] text-[15px] leading-relaxed max-w-md">
          Feedback from clients and colleagues I've had the pleasure of working with.
        </p>
      </div>

      <div class="flex justify-center gap-6 mt-14 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden">
        <TestimonialsColumn :testimonials="firstColumn" :duration="15" />
        <TestimonialsColumn :testimonials="secondColumn" class="hidden md:block" :duration="19" />
        <TestimonialsColumn :testimonials="thirdColumn" class="hidden lg:block" :duration="17" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import TestimonialsColumn from './ui/TestimonialsColumn.vue'
import { useTestimonials } from '../composables/useTestimonials'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const { testimonials, fetchTestimonials } = useTestimonials()

const firstColumn = computed(() => testimonials.value.slice(0, 3))
const secondColumn = computed(() => testimonials.value.slice(3, 6))
const thirdColumn = computed(() => testimonials.value.slice(6, 9))

function setupObserver() {
  const elements = sectionRef.value?.querySelectorAll('.reveal')
  if (!elements) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    { threshold: 0.1 }
  )

  elements.forEach((el) => observer.observe(el))
}

onMounted(async () => {
  await fetchTestimonials()
  nextTick(() => setupObserver())
})
</script>
