export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ email: string; password: string }>(event)

    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email e senha são obrigatórios',
      })
    }

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      console.error('ADMIN_EMAIL e ADMIN_PASSWORD devem estar configurados no .env')
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuração de autenticação não encontrada',
      })
    }

    // Verifica credenciais
    if (body.email !== adminEmail || body.password !== adminPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Email ou senha incorretos',
      })
    }

    // Cria sessão usando nuxt-auth-utils
    await setUserSession(event, {
      authenticated: true,
      email: body.email,
    })

    return {
      success: true,
      email: body.email,
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Erro ao fazer login:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao processar login',
    })
  }
})
