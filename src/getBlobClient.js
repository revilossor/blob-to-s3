const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob')

module.exports = (account, accountKey) => {
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  return new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
}
