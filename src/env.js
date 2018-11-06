import path from 'path'
import dotenv from 'dotenv'

const env = path.join(__dirname, '../.env')
dotenv.config({path: env})

let hasError = false

if (process.env.PORT === undefined) {
  console.log('Variável PORTA não definida!. Defina no arquivo .env')
  hasError = true
}

if (process.env.BD_URL === undefined) {
  console.log('Ocorreu um erro ao encontrar a variavel BD_URL. Defina no arquivo .env')
  hasError = true
}

if (hasError)
  process.exit(1)
