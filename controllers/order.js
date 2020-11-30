module.exports.get = (req, res) => {
  res.status(200).json({ message: 'ok' })
  console.log('get order')
}

module.exports.create = (req, res) => {
  res.status(200).json({ message: 'ok' })
  console.log('create order')
}
