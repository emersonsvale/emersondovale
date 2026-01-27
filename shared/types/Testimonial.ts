export interface Testimonial {
  id: string
  text: string
  image: string
  name: string
  role: string
  created_at?: string
  updated_at?: string
}

export interface TestimonialInsert {
  text: string
  image: string
  name: string
  role: string
}

export interface TestimonialUpdate {
  text?: string
  image?: string
  name?: string
  role?: string
}
