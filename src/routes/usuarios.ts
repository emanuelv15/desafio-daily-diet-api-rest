import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import {
  getUsuarioParamsSchema,
  postUsuarioBodySchema,
} from '../types/usuariosTypes'

export async function usuariosRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const usuarios = await knex('usuarios').select()

    return { usuarios }
  })

  app.get('/:id', async (req) => {
    const { id } = getUsuarioParamsSchema.parse(req.params)

    const usuario = await knex('usuarios')
      .where({
        id,
      })
      .first()

    return { usuario }
  })

  app.post('/', async (req, reply) => {
    const { usuario, senha, permissoes } = postUsuarioBodySchema.parse(req.body)

    let sessionID = req.cookies.sessionID

    if (!sessionID) {
      sessionID = randomUUID()

      reply.cookie('sessionID', sessionID, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('usuarios').insert({
      id: randomUUID(),
      session_id: sessionID,
      usuario,
      senha,
      permissoes,
    })

    return reply.status(201).send()
  })
}
