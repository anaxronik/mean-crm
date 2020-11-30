const User = require('../models/User')

module.exports.login = (req, res) => {
  res.status(200).json({
    message: 'ok',
    email: req.body.email,
    password: req.body.password,
  })
  console.log('login')
}

module.exports.register = (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const user = new User({ email, password })
  user
    .save()
    .then(() => {
      console.log('User has been created')
    })
    .catch((err) => {
      if (err.code === 11000) {
        console.log('email allready in use')
      }
      console.log(err.index)
    })

  res.status(200).json({ message: 'ok' })
}
