export async function requireAuth(event: any) {
  const session = await getUserSession(event)
  
  if (!session?.authenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Não autenticado',
    })
  }
  
  return session
}
