require('dotenv').config()

const fs = require('fs')

const getBlobClient = require('./getBlobClient')
const getS3Client = require('./getS3Client')

const getReadStream = require('./getReadStream')
const getWriteStream = require('./getWriteStream')

const account = process.env.STORAGE_ACCOUNT
const accountKey = process.env.STORAGE_KEY

const src_container = process.env.SOURCE_CONTAINER
const src_filename = process.env.SOURCE_FILENAME
const dest_container = process.env.DEST_CONTAINER
const dest_filename = process.env.DEST_FILENAME

const readStream = getReadStream(getBlobClient(account, accountKey))
const writeStream = getWriteStream(getS3Client())

function doStuff() {
  return new Promise((resolve, reject) => {
    readStream(src_container, src_filename).then(read => {
      const write = writeStream(dest_container, dest_filename)

      read.pipe(write)

      read.on('end', resolve)
      read.on('error', reject)
      write.on('error', reject)
    })
  })
}

doStuff().then(() => {
  console.log('stuff be done')
}).catch(e => {
  console.error(e)
})
