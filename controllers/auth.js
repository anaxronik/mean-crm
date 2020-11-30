module.exports.login = (req, res) => {
  res.status(200).json({
    message: 'ok',
    email: req.body.email,
    password: req.body.password,
  })
  console.log('login')
}

module.exports.register = (req, res) => {
  res.status(200).json({ message: 'ok' })
  console.log('register')
}
