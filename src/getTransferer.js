const getBlobClient = require('./getBlobClient')
const getS3Client = require('./getS3Client')

const getReadStream = require('./getReadStream')
const getWriteStream = require('./getWriteStream')

const account = process.env.STORAGE_ACCOUNT
const accountKey = process.env.STORAGE_KEY

module.exports = (azureContainer, awsContainer) => {
  const readStream = getReadStream(getBlobClient(account, accountKey))
  const writeStream = getWriteStream(getS3Client())
  return filename => new Promise((resolve, reject) => {
    readStream(azureContainer, filename).then(read => {
      const write = writeStream(awsContainer, filename)
      read.pipe(write)

      read.on('end', resolve)
      read.on('error', reject)
      write.on('error', reject)
    })
  })
}
