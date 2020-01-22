require('dotenv').config()

const getTransferer = require('./getTransferer')

const src_container = process.env.SOURCE_CONTAINER
const src_filename = process.env.SOURCE_FILENAME
const dest_container = process.env.DEST_CONTAINER
const dest_filename = process.env.DEST_FILENAME

const transfer = getTransferer(src_container, dest_container)

transfer('1111-1111-1111-1111-1111.wav')
  .catch(e => console.error(e))
