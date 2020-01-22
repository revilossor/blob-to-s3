const stream = require('stream')

module.exports = client => (Bucket, Key) => {
  const passThru = new stream.PassThrough()
  client.upload({
    Bucket, Key, Body: passThru
  }, (err, data) => {
    console.log(err, data)
  })
  return passThru
}
