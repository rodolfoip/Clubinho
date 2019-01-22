import {ObjectId} from "mongodb";
import {db} from "../bd/BD"

const COL_EVENTS = 'events'

async function registerEvent(event) {
  const col = db.collection(COL_EVENTS)
  await col.insertOne(event)
  return event
}

async function updateEvent(event) {
  const col = db.collection(COL_EVENTS)
  await col.updateOne({_id: ObjectId(event._id)}, {
    $set: {
      local: event.local,
      userId: event.userId
    }
  })

  return event
}

async function searchAllEvents() {
  const col = db.collection(COL_EVENTS)
  const results = await col.find().toArray()

  return results
}

async function searchEventById(id) {
  const col = db.collection(COL_EVENTS)
  const result = await col.findOne({_id: ObjectId(id)})

  return result
}

async function searchEventByLocal({local}) {
  const col = db.collection(COL_EVENTS)
  const result = await col.findOne({local})

  return result
}

async function searchEventsByUser({userId}) {
  const col = db.collection(COL_EVENTS)
  const results = await col.find({userId}).toArray()

  return results
}

async function deleteEventById(id) {
  const col = db.collection(COL_EVENTS)
  const result = await col.deleteOne({_id: ObjectId(id)})

  return result
}

export {
  registerEvent,
  updateEvent,
  deleteEventById,
  searchAllEvents,
  searchEventById,
  searchEventByLocal,
  searchEventsByUser
}
