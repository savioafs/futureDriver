import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    students: {
      id: string,
      register: string,
      cpf: number,
      name: string,
      instructor: string,
      student_since: string
    }
  }
}