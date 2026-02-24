import { getSupabaseServerClient } from '../../utils/supabase'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event): Promise<{ success: boolean }> => {
  // Verifica autenticação
  await requireAuth(event)

  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID é obrigatório',
      })
    }

    const supabase = getSupabaseServerClient(event)
    const { data: existingProject, error: existingProjectError } = await supabase
      .from('projetos')
      .select('id')
      .eq('id', Number(id))
      .maybeSingle()

    if (existingProjectError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Erro ao buscar projeto no Supabase: ${existingProjectError.message}`,
      })
    }

    if (!existingProject) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Projeto não encontrado',
      })
    }

    const { error } = await supabase
      .from('projetos')
      .delete()
      .eq('id', Number(id))

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Erro ao deletar projeto no Supabase: ${error.message}`,
      })
    }

    return { success: true }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Erro ao deletar projeto:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao deletar projeto',
    })
  }
})
