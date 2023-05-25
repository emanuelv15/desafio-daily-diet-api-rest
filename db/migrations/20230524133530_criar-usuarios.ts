import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('usuarios', (table) => {
    table.uuid('id').primary()
    table.uuid('session_id').index()
    table.text('usuario').notNullable()
    table.text('senha').notNullable()
    table.text('permissoes').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('usuarios')
}
