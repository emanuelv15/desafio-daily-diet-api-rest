import { z } from 'zod'

export const getRefeicaoParamsSchema = z.object({
  id: z.string().uuid(),
})

export const deleteRefeicaoParamsSchema = z.object({
  id: z.string().uuid(),
})

export const putRefeicaoBodySchema = z.object({
  id: z.string().uuid(),
  nome: z.string().optional(),
  descricao: z.string().optional(),
  esta_na_dieta: z.boolean().optional(),
  created_at: z.string().optional(),
})

export const postRefeicaoBodySchema = z.object({
  nome: z.string(),
  descricao: z.string(),
  esta_na_dieta: z.boolean(),
  created_at: z.string(),
})
