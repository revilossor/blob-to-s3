module.exports = blobClient => async (container, filename) => {
  const buffer = await blobClient.getContainerClient(container)
    .getBlobClient(filename)
    .download()

  // console.dir({ buffer })

  return buffer.readableStreamBody || null;
}
