module.exports = (response, error) => {
  const errorMessage = error.message ? error.message : error
  response.status(500).json({
    success: false,
    message: errorMessage,
  })
  console.error('=x', errorMessage)
}
