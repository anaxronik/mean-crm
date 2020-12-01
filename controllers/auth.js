const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/SECRET_KEY')
const User = require('../models/User')

module.exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const user = await User.findOne({ email })
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ email, userId: user._id }, SECRET_KEY, {
        expiresIn: 60 * 60,
      })
      const tokenBearer = 'Bearer ' + token
      res.status(200).json({
        message: 'ok',
        token: tokenBearer,
      })
    } else {
      res.status(401).json({ message: 'Неверный пароль.' })
    }
  } else {
    res
      .status(404)
      .json({ message: 'Пользователя с таким email не существует.' })
  }
}

module.exports.register = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  // check email in db
  if (await User.findOne({ email })) {
    res.status(409).json({ message: 'This email allready in use!' })
  } else {
    const user = new User({
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    })
    try {
      await user.save()
      res.status(201).json({ message: 'Account created!' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error on server in create user' })
    }
  }
}
