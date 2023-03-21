import fastify from 'fastify'
import { env } from './env/index'
import { studentsRoutes } from './routes/students'

const app = fastify()

app.register(studentsRoutes, {
  prefix: 'students'
})

app.listen({
  port: env.PORT
}).then(() => {
  console.log('Server is running!')
})
