/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { knex } from '../database'
import {
  deleteRefeicaoParamsSchema,
  getRefeicaoParamsSchema,
  postRefeicaoBodySchema,
  putRefeicaoBodySchema,
} from '../types/refeicoesTypes'
import { verificarSessionId } from '../middlewares/verificarSessionId'

export async function refeicoesRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [verificarSessionId] }, async (req) => {
    const { sessionID } = req.cookies

    const refeicoes = await knex('refeicoes')
      .where({
        usuario_session_id: sessionID,
      })
      .select()

    return { refeicoes }
  })

  app.get('/:id', { preHandler: [verificarSessionId] }, async (req) => {
    const { sessionID } = req.cookies

    const { id } = getRefeicaoParamsSchema.parse(req.params)

    const refeicao = await knex('refeicoes')
      .where({
        id,
        usuario_session_id: sessionID,
      })
      .select()
      .first()

    return { refeicao }
  })

  app.put('/', { preHandler: [verificarSessionId] }, async (req) => {
    const { sessionID } = req.cookies

    const { id, nome, descricao, esta_na_dieta, created_at } =
      putRefeicaoBodySchema.parse(req.body)

    const refeicao = await knex('refeicoes')
      .where({
        id,
        usuario_session_id: sessionID,
      })
      .first()

    if (refeicao) {
      await knex('refeicoes')
        .where({
          id,
          usuario_session_id: sessionID,
        })
        .update({
          nome: nome !== null ? nome : refeicao.nome,
          descricao: descricao !== null ? descricao : refeicao.descricao,
          esta_na_dieta:
            esta_na_dieta !== null ? esta_na_dieta : refeicao.esta_na_dieta,
          created_at: created_at !== null ? created_at : refeicao.created_at,
        })
    }
  })

  app.delete('/:id', { preHandler: [verificarSessionId] }, async (req) => {
    const { sessionID } = req.cookies

    const { id } = deleteRefeicaoParamsSchema.parse(req.params)

    await knex('refeicoes')
      .where({
        id,
        usuario_session_id: sessionID,
      })
      .delete()
  })

  app.post('/', { preHandler: [verificarSessionId] }, async (req, reply) => {
    const { sessionID } = req.cookies

    const { nome, descricao, esta_na_dieta, created_at } =
      postRefeicaoBodySchema.parse(req.body)

    await knex('refeicoes').insert({
      id: randomUUID(),
      usuario_session_id: sessionID,
      nome,
      descricao,
      esta_na_dieta,
      created_at,
    })

    return reply.status(201).send()
  })
}
