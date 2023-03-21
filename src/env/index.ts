import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.number().default(3033)
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
  throw new Error('Invalid enviroment variable')
}

export const env = _env.data