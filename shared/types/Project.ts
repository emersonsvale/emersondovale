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
  github_url?: string | null
  live_url?: string | null
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
  github_url?: string | null
  live_url?: string | null
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
  github_url?: string | null
  live_url?: string | null
}
