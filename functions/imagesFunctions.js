const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()

app.post('/user_profile_picture', upload.single('image'), (req, res, next)=>{
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })