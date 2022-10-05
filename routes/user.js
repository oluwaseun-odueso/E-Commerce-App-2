const express = require('express')
const router = express.Router()

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const {uploadFile, getFile} = require('../s3')

const {verifyUserToken} = require('../auth/jwtAuth')
const {
    signUpUser, 
    loginUser, 
    updateUserAccount, 
    deleteAccount, 
    getUserAccount
} = require('../controllers/userController')

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.put('/update_account', verifyUserToken, updateUserAccount)
router.delete('/delete_account', verifyUserToken, deleteAccount)
router.get('/get_account', verifyUserToken, getUserAccount)

router.get('/get_image/:key', (req, res) => {
    const key = req.params.key
    const readStream = getFile(key)
    readStream.pipe(res)
})

router.post('/upload_image', upload.single('image'), async (req, res)=>{
    try {
        const file = req.file
        const result = await uploadFile(file)
        console.log(result.Key)
        await unlinkFile(file.path)
        res.status(200).send({message: "Profile picture successfully uploaded", immage_path: `/upload_image/${result.Key}`})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
  })

module.exports = router