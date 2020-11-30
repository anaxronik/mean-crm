const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports.login = (req, res) => {
  res.status(200).json({
    message: 'ok',
    email: req.body.email,
    password: req.body.password,
  })
  console.log('login')
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
