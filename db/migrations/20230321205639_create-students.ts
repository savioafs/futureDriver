import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('students', (table) => {
    table.uuid('id').unique().primary()
    table.integer('register').unique().notNullable()
    table.integer('cpf').unique().notNullable()
    table.text('name').notNullable()
    table.text('instructor').notNullable()
    table.timestamp('student_since').defaultTo(knex.fn.now()).notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('students')
}

