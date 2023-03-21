import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { dbConfig } from '../database'
import { randomUUID } from 'node:crypto'
import cryptoRandomString from 'crypto-random-string'

export async function studentsRoutes(app: FastifyInstance) {

  app.get('/', async () => {
    const students = await dbConfig('students')
      .select('*')

    return { students }
  })

  app.get('/:cpf', async (req) =>{
    const getStudentByCPFSchema = z.object({
      cpf: z.string()
    })

    const { cpf } = getStudentByCPFSchema.parse(req.params)

    const student = await dbConfig('students').where('cpf', cpf).first()

    return { student}
  })

  app.post('/', async (req, rep) => {

    const createStudentSchema = z.object({
      name: z.string(),
      instructor: z.string(),
      cpf: z.number()
    })

    const { name, cpf, instructor } = createStudentSchema.parse(req.body)

    await dbConfig('students')
      .insert({
        id: randomUUID(),
        register: cryptoRandomString({length: 10, type: 'numeric'}),
        cpf,
        name,
        instructor
      }).catch(() => {
        return rep.status(400).send('Estudante já registrado!')
      })
      

      return rep.status(201).send('Estudante criado com sucesso!')
  })
}