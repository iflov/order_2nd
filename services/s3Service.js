const { s3Dao } = require('../models/s3Dao');
const { imageUploader , s3 } = require('../imageUploader');

const register = async ( commentId ) => {
  imageUploader.single('image');

  s3Dao.register( commentId, s3ImageUrl ) // + s3에 업로드한 이미지 url 받아올 변수 필요함
}

module.exports = { register }