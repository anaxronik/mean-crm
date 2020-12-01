const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const { SECRET_KEY } = require('../config/SECRET_KEY')
const User = require('../models/User')

const UserSchema = mongoose.model('users')

module.exports.passportMW = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_KEY,
      },
      async (payload, done) => {
        try {
          const user = await UserSchema.findById(payload.userId).select(
            'email id'
          )

          if (await UserSchema.findById(payload.userId).select('email id')) {
            done(null, user)
          } else {
            done(null, false)
          }
        } catch (e) {
          console.log(e)
        }
      }
    )
  )
}
