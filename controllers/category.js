module.exports.getAll = (req, res) => {
  res.status(200).json({ message: 'ok' })
  console.log('get all category')
}

module.exports.getById = (req, res) => {
  res.status(200).json({ message: 'ok' })
  console.log('getById category')
}

module.exports.deleteById = (req, res) => {
  res.status(200).json({ message: 'ok' })
  console.log('deleteById category')
}

module.exports.create = (req, res) => {
  res.status(200).json({ message: 'ok' })
  console.log('create category')
}

module.exports.updateById = (req, res) => {
  res.status(200).json({ message: 'ok' })
  console.log('updateById category')
}
