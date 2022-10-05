const {uploadFile, getFile} = require('./s3')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const getImage = async(req, res) => {
    try {
        const key = req.params.key
        const readStream = getFile(key)
        readStream.pipe(res)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const uploadImage = async(req, res) => {
    try {
        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)
        res.status(200).send({message: "Picture uploaded successfully", image_path: `/upload_image/${result.Key}`})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

const controllers = {
    getImage,
    uploadImage
}

module.exports = controllers