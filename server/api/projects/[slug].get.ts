import type { Project } from '../../../../shared/types/Project'
import { mapSupabaseProjetoToProject, type SupabaseProjetoRow } from '../../utils/projectMapper'
import { getSupabaseServerClient } from '../../utils/supabase'

export default defineEventHandler(async (event): Promise<Project> => {
  try {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Slug é obrigatório',
      })
    }

    const supabase = getSupabaseServerClient(event)
    const { data, error } = await supabase
      .from('projetos')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Erro ao buscar projeto no Supabase: ${error.message}`,
      })
    }

    if (!data) {
      throw createError({
        statusCode: 404,
        statusMessage: `Projeto não encontrado para o slug: ${slug}`,
      })
    }

    return mapSupabaseProjetoToProject(data as SupabaseProjetoRow)
  } catch (error: any) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('❌ [ERROR] Erro ao buscar projeto:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao carregar projeto: ${error?.message || 'Erro desconhecido'}`,
    })
  }
})
