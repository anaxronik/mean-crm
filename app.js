const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('morgan')('dev'))
app.use(require('cors')())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/order', require('./routes/order'))
app.use('/api/category', require('./routes/category'))
app.use('/api/position', require('./routes/position'))
app.use('/api/analytics', require('./routes/analytics'))

module.exports = app
