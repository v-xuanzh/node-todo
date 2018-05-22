// @ts-check
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const db = mongoose.connection
const dbConfig = require('./config/database')

const app = express()
const port = process.env.PORT || 8080

mongoose.connect(dbConfig.connection)

db.on('error', (err) => {
  console.error(err.message)
  mongoose.disconnect()
})

db.on('disconnected', () => {
  mongoose.connect(dbConfig.connection)
})

app.use(express.static('./public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ 'extended': true }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride('X-HTTP-Method-Override'))

require('./app/routes.js')(app)

app.listen(port)
console.log(`App listening on port ${port}`)
