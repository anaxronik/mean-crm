module.exports.overview = (req, res) => {
  res.status(200).json({ message: 'ok' })
  console.log('overview analytics')
}

module.exports.analytics = (req, res) => {
  res.status(200).json({ message: 'ok' })
  console.log('analytics')
}
