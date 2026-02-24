export interface Project {
  id: string
  title: string
  description: string
  slug: string
  image?: string | null
  category?: string | null
  featured?: boolean
  content?: string | null
  technologies?: string[] | null
  link_web?: string | null
  link_google?: string | null
  link_apple?: string | null
  created_at?: string
  updated_at?: string
}

export interface ProjectInsert {
  title: string
  description: string
  slug: string
  image?: string | null
  category?: string | null
  featured?: boolean
  content?: string | null
  technologies?: string[] | null
  link_web?: string | null
  link_google?: string | null
  link_apple?: string | null
}

export interface ProjectUpdate {
  title?: string
  description?: string
  slug?: string
  image?: string | null
  category?: string | null
  featured?: boolean
  content?: string | null
  technologies?: string[] | null
  link_web?: string | null
  link_google?: string | null
  link_apple?: string | null
}
