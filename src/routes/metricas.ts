/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'

import { knex } from '../database'
import { verificarSessionId } from '../middlewares/verificarSessionId'

export async function metricasRoutes(app: FastifyInstance) {
  app.get('/dieta', { preHandler: [verificarSessionId] }, async (req) => {
    const { sessionID } = req.cookies

    const refeicoes = await knex('refeicoes')
      .where({
        usuario_session_id: sessionID,
      })
      .select()

    const refeicoesDentroDaDieta = await knex('refeicoes')
      .where({
        usuario_session_id: sessionID,
        esta_na_dieta: true,
      })
      .select()

    const refeicoesForaDaDieta = await knex('refeicoes')
      .where({
        usuario_session_id: sessionID,
        esta_na_dieta: false,
      })
      .select()

    const totalRefeicoes = refeicoes.length
    const totalRefeicoesDentroDaDieta = refeicoesDentroDaDieta.length
    const totalRefeicoesForaDaDieta = refeicoesForaDaDieta.length

    let sequenciaRefeitcoesDentroDaDieta = 0

    // eslint-disable-next-line array-callback-return
    refeicoes.map((refeicao) => {
      refeicao.esta_na_dieta
        ? sequenciaRefeitcoesDentroDaDieta++
        : (sequenciaRefeitcoesDentroDaDieta = 0)
    })

    return {
      totalRefeicoes,
      totalRefeicoesDentroDaDieta,
      totalRefeicoesForaDaDieta,
      sequenciaRefeitcoesDentroDaDieta,
    }
  })
}
