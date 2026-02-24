import { readFile } from 'fs/promises'
import { join } from 'path'
import type { Testimonial } from '../../shared/types/Testimonial'
import { getSupabaseServerClient } from '../utils/supabase'

type SupabaseDepoimentoRow = {
  id?: string | number | null
  created_at?: string | null
  updated_at?: string | null
  text?: string | null
  texto?: string | null
  image?: string | null
  imagem?: string | null
  image_url?: string | null
  imagem_url?: string | null
  foto?: string | null
  foto_url?: string | null
  avatar?: string | null
  avatar_url?: string | null
  name?: string | null
  nome?: string | null
  role?: string | null
  cargo?: string | null
}

const pickFirstNonEmpty = (...values: Array<string | null | undefined>) => {
  for (const value of values) {
    if (typeof value === 'string') {
      const trimmed = value.trim()
      if (trimmed.length > 0) {
        return trimmed
      }
    }
  }

  return ''
}

const normalizeSupabaseStorageImageUrl = (value: string, event: Parameters<typeof useRuntimeConfig>[0]) => {
  const trimmed = value.trim()
  if (!trimmed) return ''

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed
  }

  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`
  }

  const config = useRuntimeConfig(event)
  const supabaseUrl = (config.supabaseUrl as string | undefined)?.replace(/\/+$/, '')
  if (!supabaseUrl) {
    return trimmed
  }

  const normalizedPath = trimmed.replace(/^\/+/, '')

  if (normalizedPath.startsWith('storage/v1/object/public/')) {
    return `${supabaseUrl}/${normalizedPath}`
  }

  if (normalizedPath.startsWith('object/public/')) {
    return `${supabaseUrl}/storage/v1/${normalizedPath}`
  }

  if (normalizedPath.startsWith('public/')) {
    return `${supabaseUrl}/storage/v1/object/${normalizedPath}`
  }

  if (/^[^/]+\/.+/.test(normalizedPath)) {
    return `${supabaseUrl}/storage/v1/object/public/${normalizedPath}`
  }

  return trimmed
}

const createAvatarFallback = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=1a1a1a&color=c9a962&size=160`

const mapSupabaseDepoimentoToTestimonial = (
  row: SupabaseDepoimentoRow,
  event: Parameters<typeof useRuntimeConfig>[0]
): Testimonial => {
  const name = pickFirstNonEmpty(row.name, row.nome)
  const imageRaw = pickFirstNonEmpty(
    row.image,
    row.imagem,
    row.image_url,
    row.imagem_url,
    row.foto,
    row.foto_url,
    row.avatar,
    row.avatar_url
  )
  const image = imageRaw ? normalizeSupabaseStorageImageUrl(imageRaw, event) : createAvatarFallback(name)

  return {
    id: String(row.id ?? ''),
    text: pickFirstNonEmpty(row.text, row.texto),
    image,
    name,
    role: pickFirstNonEmpty(row.role, row.cargo),
    created_at: row.created_at || undefined,
    updated_at: row.updated_at || undefined,
  }
}

const sortTestimonialsByCreatedAt = (testimonials: Testimonial[]) =>
  testimonials.sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
    return dateB - dateA
  })

const readLocalTestimonials = async (): Promise<Testimonial[]> => {
  const filePath = join(process.cwd(), 'data', 'testimonials.json')
  const fileContent = await readFile(filePath, 'utf-8')
  const testimonials: Testimonial[] = JSON.parse(fileContent)
  return sortTestimonialsByCreatedAt(testimonials)
}

export default defineEventHandler(async (event): Promise<Testimonial[]> => {
  try {
    const supabase = getSupabaseServerClient(event)
    const { data, error } = await supabase
      .from('depoimentos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Erro ao buscar depoimentos no Supabase. Usando fallback local.', error.message)
      return await readLocalTestimonials()
    }

    const testimonials = (data || []).map((row) => mapSupabaseDepoimentoToTestimonial(row as SupabaseDepoimentoRow, event))
    return sortTestimonialsByCreatedAt(testimonials)
  } catch (error) {
    console.error('Erro ao ler testimonials do Supabase. Tentando fallback local:', error)

    try {
      return await readLocalTestimonials()
    } catch (fallbackError) {
      console.error('Erro ao ler testimonials no fallback local:', fallbackError)
      throw createError({
        statusCode: 500,
        statusMessage: 'Erro ao carregar testimonials',
      })
    }
  }
})
