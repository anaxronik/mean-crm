const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

const { MONGO_URI } = require('./config/DB')
const { passportMW } = require('./midleware/passport')

const app = express()

// DB
mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('> Mongo DB connected'))
  .catch((err) => console.log(err))

// route protection
app.use(passport.initialize())
passportMW(passport)

// utils
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('morgan')('dev'))
app.use(require('cors')())

// server static files
app.use('/uploads', express.static('uploads'))

// routes
app.use('/api/auth', require('./routes/auth'))
app.use(
  '/api/order',
  passport.authenticate('jwt', { session: false }),
  require('./routes/order')
)
app.use(
  '/api/category',
  passport.authenticate('jwt', { session: false }),
  require('./routes/category')
)
app.use(
  '/api/position',
  passport.authenticate('jwt', { session: false }),
  require('./routes/position')
)
app.use(
  '/api/analytics',
  passport.authenticate('jwt', { session: false }),
  require('./routes/analytics')
)

module.exports = app
