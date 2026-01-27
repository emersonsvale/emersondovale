import type { Testimonial } from '../../shared/types/Testimonial'

export const useTestimonials = () => {
  const testimonials = useState<Testimonial[]>('testimonials', () => [])
  const loading = useState<boolean>('testimonials-loading', () => false)
  const error = useState<string | null>('testimonials-error', () => null)

  const fetchTestimonials = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<Testimonial[]>('/api/testimonials')
      testimonials.value = response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar testimonials'
      console.error('Erro ao buscar testimonials:', err)
    } finally {
      loading.value = false
    }
  }

  const createTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await $fetch<Testimonial>('/api/testimonials', {
        method: 'POST',
        body: testimonial,
      })
      await fetchTestimonials()
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar testimonial'
      throw err
    }
  }

  const updateTestimonial = async (id: string, testimonial: Partial<Testimonial>) => {
    try {
      const response = await $fetch<Testimonial>(`/api/testimonials/${id}`, {
        method: 'PUT',
        body: testimonial,
      })
      await fetchTestimonials()
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar testimonial'
      throw err
    }
  }

  const deleteTestimonial = async (id: string) => {
    try {
      await $fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      })
      await fetchTestimonials()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao deletar testimonial'
      throw err
    }
  }

  return {
    testimonials: readonly(testimonials),
    loading: readonly(loading),
    error: readonly(error),
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  }
}
