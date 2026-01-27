export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)
    
    if (!session?.authenticated) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Não autenticado',
      })
    }

    return {
      authenticated: true,
      email: session.email,
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Erro ao verificar sessão:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao verificar sessão',
    })
  }
})
