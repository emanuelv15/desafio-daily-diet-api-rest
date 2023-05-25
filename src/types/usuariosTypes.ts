import { z } from 'zod'

export const getUsuarioParamsSchema = z.object({
  id: z.string().uuid(),
})

export const postUsuarioBodySchema = z.object({
  usuario: z.string(),
  senha: z.string(),
  permissoes: z.string(),
})
