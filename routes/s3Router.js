const express = require('express');
const router = express.Router();
const s3Controller = require('../controllers/s3Controller');
// const {imageUploader} = require('../imageUploader')ßß

// router.post('/image' ,imageUploader.single('image'), ( req, res ) => {
//   res.send('good!');
// })

router.post('/image' ,s3Controller.register);

module.exports = router;