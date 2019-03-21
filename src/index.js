import _ from './env'

import https from 'https'
import fs from 'fs'
import path from 'path'

import express from 'express'
let cors = require('cors')

import bodyParser from 'body-parser'
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express'

import schema from './apollo'

const port = process.env.PORT
const options = {
  key: fs.readFileSync(path.join(__dirname, '../cert/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../cert/server.cert'))
}

const app = express()

app.use(cors())
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

const server = https.createServer(options, app)

server.listen(port, () => {
  console.log('Server running on https://dev.rodolfo:4000/graphql')
  console.log('Go to https://dev.rodolfo:4000/graphiql for execute query`s')
})
