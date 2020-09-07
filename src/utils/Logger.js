function logger (method, error) {
  console.log(`[error] [${method}] ${error}`)
}

module.exports = logger