import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('refeicoes', (table) => {
    table.uuid('id').primary()
    table.uuid('usuario_session_id').index()
    table.text('nome').notNullable()
    table.text('descricao').notNullable()
    table.boolean('esta_na_dieta').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('refeicoes')
}
