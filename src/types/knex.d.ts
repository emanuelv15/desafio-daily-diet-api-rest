// eslint-disable-next-line no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    usuarios: {
      id: string
      session_id?: string
      usuario: string
      senha: string
      permissoes: string
      created_at: string
    }
    refeicoes: {
      id: string
      usuario_session_id?: string
      nome: string
      descricao: string
      esta_na_dieta: boolean
      created_at: string
    }
  }
}
