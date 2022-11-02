const { s3Service } = require('../services/s3Service');

const register = async( req, res ) => {

  const { commentId } = req.query
  await s3Service.register( commentId )
  res.status(201).json({ message : 'good' })
}

module.exports = { register }