import {MongoClient, ObjectId} from 'mongodb'

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
  return event
}

async function updateEvent(event) {
  const col = db.collection(COL_EVENTOS)
  await col.updateOne({_id: ObjectId(event._id)}, {
    $set: {
      local: event.local,
      author: event.author
    }
  })

  return event
}

async function searchAllEvent() {
  const col = db.collection(COL_EVENTOS)
  const results = await col.find().toArray()

  return results
}


async function searchEventById(id) {
  const col = db.collection(COL_EVENTOS)
  const result = await col.findOne({_id: ObjectId(id)})

  return result
}

async function searchEventByLocal({local}) {
  const col = db.collection(COL_EVENTOS)
  const result = await col.findOne({local})

  return result
}

async function deleteEventById(id) {
  const col = db.collection(COL_EVENTOS)
  const result = await col.deleteOne({_id: ObjectId(id)})

  return result
}

export {
  registerEvent,
  updateEvent,
  deleteEventById,
  searchAllEvent,
  searchEventById,
  searchEventByLocal
}
