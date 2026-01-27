<template>
  <div
    :class="cn('relative', $attrs.class)"
    role="region"
    aria-roledescription="carousel"
    @keydown.capture="handleKeyDown"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, watch, ref, type Ref } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'
import type { EmblaCarouselType } from 'embla-carousel'
import { cn } from '../../utils/cn'

export interface CarouselApi {
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  canScrollPrev: () => boolean
  canScrollNext: () => boolean
  selectedScrollSnap: () => number
  on: (event: string, callback: () => void) => void
  off: (event: string, callback: () => void) => void
}

interface CarouselContext {
  emblaRef: Ref<HTMLElement | null>
  api: Ref<EmblaCarouselType | undefined>
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: Ref<boolean>
  canScrollNext: Ref<boolean>
  orientation: 'horizontal' | 'vertical'
}

const props = withDefaults(
  defineProps<{
    opts?: {
      axis?: 'x' | 'y'
      breakpoints?: Record<string, Record<string, unknown>>
      [key: string]: unknown
    }
    orientation?: 'horizontal' | 'vertical'
  }>(),
  {
    opts: () => ({}),
    orientation: 'horizontal',
  }
)

const emit = defineEmits<{
  'update:api': [api: CarouselApi | undefined]
}>()

const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    ...props.opts,
    axis: props.orientation === 'horizontal' ? 'x' : 'y',
  },
  []
)

const canScrollPrev = ref(false)
const canScrollNext = ref(false)

const scrollPrev = () => {
  emblaApi.value?.scrollPrev()
}

const scrollNext = () => {
  emblaApi.value?.scrollNext()
}

const updateSelection = () => {
  if (!emblaApi.value) return
  canScrollPrev.value = emblaApi.value.canScrollPrev()
  canScrollNext.value = emblaApi.value.canScrollNext()
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    scrollPrev()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    scrollNext()
  }
}

watch(emblaApi, (api) => {
  if (!api) {
    emit('update:api', undefined)
    return
  }

  updateSelection()
  api.on('reInit', updateSelection)
  api.on('select', updateSelection)

  const carouselApi: CarouselApi = {
    scrollPrev: () => api.scrollPrev(),
    scrollNext: () => api.scrollNext(),
    scrollTo: (index: number) => api.scrollTo(index),
    canScrollPrev: () => api.canScrollPrev(),
    canScrollNext: () => api.canScrollNext(),
    selectedScrollSnap: () => api.selectedScrollSnap(),
    on: (event: string, callback: () => void) => {
      api.on(event as any, callback)
    },
    off: (event: string, callback: () => void) => {
      api.off(event as any, callback)
    },
  }

  emit('update:api', carouselApi)
}, { immediate: true })

const context: CarouselContext = {
  emblaRef,
  api: emblaApi,
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
  orientation: props.orientation || (props.opts?.axis === 'y' ? 'vertical' : 'horizontal'),
}

provide('carousel', context)
</script>
