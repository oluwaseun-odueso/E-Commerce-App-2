require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
}) 

// uploads images to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}
 
// downloads/gets a file from s3
function getFile(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream()
}

async function deleteFile(fileKey) {
    const deleteParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.deleteObject(deleteParams).promise()
}

const imageFunctions = {
    uploadFile,
    getFile,
    deleteFile
}

module.exports = imageFunctions