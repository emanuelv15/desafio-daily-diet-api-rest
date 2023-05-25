import cookie from '@fastify/cookie'
import fastify from 'fastify'

import { usuariosRoutes } from './routes/usuarios'
import { refeicoesRoutes } from './routes/refeicoes'
import { metricasRoutes } from './routes/metricas'

export const app = fastify()

app.register(cookie)

app.register(usuariosRoutes, {
  prefix: 'usuarios',
})

app.register(refeicoesRoutes, {
  prefix: 'refeicoes',
})

app.register(metricasRoutes, {
  prefix: 'metricas',
})
