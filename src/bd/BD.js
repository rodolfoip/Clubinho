import {MongoClient} from 'mongodb'

const BD_URL = process.env.BD_URL
let client
let db

(async () => {
  try {
    client = await MongoClient.connect(BD_URL, {useNewUrlParser: true})
    db = client.db()
    console.log('Conectou com o Banco')
    process.on('SIGIT', () => {
      client.close()
      console.log('Desconectou com o Banco')
      process.exit()
    })
  } catch (e) {
    console.log(e)
    console.log('Não conseguiu conectar com o banco')
    process.exit(1)
  }
})()

export {
  db
}
