<template>
  <section class="bg-[#0a0a0a] my-20 relative">
    <div class="container z-10 mx-auto">
      <div
        ref="headerRef"
        class="flex flex-col items-center justify-center max-w-[540px] mx-auto testimonials-header"
      >
        <div class="flex justify-center">
          <div class="border border-neutral-800/60 py-1 px-4 rounded-lg text-neutral-400">Testimonials</div>
        </div>

        <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-[#c9a962]">
          What our users say
        </h2>
        <p class="text-center mt-5 opacity-75 text-neutral-400">
          See what our customers have to say about us.
        </p>
      </div>

      <div class="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
        <TestimonialsColumn :testimonials="firstColumn" :duration="15" />
        <TestimonialsColumn :testimonials="secondColumn" class="hidden md:block" :duration="19" />
        <TestimonialsColumn :testimonials="thirdColumn" class="hidden lg:block" :duration="17" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TestimonialsColumn from './ui/TestimonialsColumn.vue'
import { useTestimonials } from '../composables/useTestimonials'

const headerRef = ref<HTMLElement | null>(null)
const { testimonials, fetchTestimonials } = useTestimonials()

const firstColumn = computed(() => testimonials.value.slice(0, 3))
const secondColumn = computed(() => testimonials.value.slice(3, 6))
const thirdColumn = computed(() => testimonials.value.slice(6, 9))

onMounted(async () => {
  await fetchTestimonials()
  
  if (headerRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('testimonials-header-visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(headerRef.value)
  }
})
</script>

<style scoped>
.testimonials-header {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.1s;
}

.testimonials-header-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
