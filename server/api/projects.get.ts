import type { Project } from '../../shared/types/Project'
import { mapSupabaseProjetoToProject, type SupabaseProjetoRow } from '../utils/projectMapper'
import { getSupabaseServerClient } from '../utils/supabase'

export default defineEventHandler(async (event): Promise<Project[]> => {
  try {
    const supabase = getSupabaseServerClient(event)

    const { data, error } = await supabase
      .from('projetos')
      .select('*')
      .order('valeapps', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Erro ao buscar projetos no Supabase: ${error.message}`,
      })
    }

    return (data || []).map((project) => mapSupabaseProjetoToProject(project as SupabaseProjetoRow))
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('Erro ao ler projetos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao carregar projetos',
    })
  }
})
