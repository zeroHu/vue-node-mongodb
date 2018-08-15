exports = module.exports = {
  debug: true,
  port: 3040,
  redis: {
    "host": "127.0.0.1",
    "port": "6379",
    "ttl": 60 * 60 * 24 * 30 //Session的有效期为30天
  }
}