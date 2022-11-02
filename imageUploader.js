const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

AWS.config.update({
  region: 'ap-northeast-1',
  accessKeyId: 'AKIATJ5W4RTSR24SIWU3',
  secretAccessKey: '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'
});

const s3 = new AWS.S3();

const allowedExtensions = ['.jpg','.png','.jpeg','.bmp'];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'goodplace-image',
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? ''
      const extension = path.extname(file.originalname)
      if(!allowedExtensions.includes(extension)){
        return callback(new Error('wrong extension'))
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
    },
    acl: 'public-read-write'
  }),
})

module.exports = { imageUploader , s3 };