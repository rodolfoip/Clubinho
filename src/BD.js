import MongoClient from 'mongodb'

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

const COL_EVENTOS = 'eventos'

async function registerEvent(event) {
  const col = db.collection(COL_EVENTOS)
  await col.insertOne(event)
}

async function searchAllEvent() {
  const col = db.collection(COL_EVENTOS)
  const results = await col.find().toArray()
  return results
}


async function searchEventById(_id) {
  const col = db.collection(COL_EVENTOS)
  const result = await col.findOne(_id)

  if (result) {
    return result
  }

  return null
}

async function searchEventByLocal({local}) {
  const col = db.collection(COL_EVENTOS)
  const result = await col.findOne({local})

  if (result) {
    return result
  }

  return null
}

export {
  registerEvent,
  searchAllEvent,
  searchEventById,
  searchEventByLocal
}
