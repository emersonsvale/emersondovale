export default defineEventHandler(async (event) => {
  try {
    await clearUserSession(event)
    return { success: true }
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao processar logout',
    })
  }
})
