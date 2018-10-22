const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = process.env.PORT || 8080

app.use(express.static('./public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ 'extended': true }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride('X-HTTP-Method-Override'))

require('./app/routes.js')(app)

app.listen(port)
console.log(`App listening on port ${port}`)
