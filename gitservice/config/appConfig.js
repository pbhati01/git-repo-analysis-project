// Server configuration
const serverConfig = {
  port: 3010,
  hostname: '127.0.0.1'
}

const dbConfig = {
  mongoUrl: 'mongodb://localhost:27017/gitanalysis'
}

const authConfig = {
  jwtSecret: 'jwttokenbasedauth'
}

module.exports = {
  serverConfig,
  dbConfig,
  authConfig
}