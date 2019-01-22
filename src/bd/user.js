import {ObjectId} from "mongodb";
import {db} from "../bd/BD"

const COL_USERS = 'users'

async function registerUser(user) {
  const col = db.collection(COL_USERS)
  await col.insertOne(user)
  return user
}

async function updateUser(user) {
  const col = db.collection(COL_USERS)
  await col.updateOne({_id: ObjectId(user._id)}, {
    $set: {
      name: user.name
    }
  })

  return user
}

async function searchAllUsers() {
  const col = db.collection(COL_USERS)
  const results = await col.find().toArray()

  return results
}


async function searchUserById(id) {
  const col = db.collection(COL_USERS)
  const result = await col.findOne({_id: ObjectId(id)})

  return result
}

async function searchUserByName({name}) {
  const col = db.collection(COL_USERS)
  const result = await col.findOne({name})

  return result
}

async function deleteUserById(id) {
  const col = db.collection(COL_USERS)
  const result = await col.deleteOne({_id: ObjectId(id)})

  return result
}

export {
  registerUser,
  updateUser,
  searchAllUsers,
  searchUserById,
  searchUserByName,
  deleteUserById
}
