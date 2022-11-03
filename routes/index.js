const express = require('express');
const router = express.Router();
const s3Router = require('./s3Router');
const orderRouter = require('./orderRouter');


router.use('/register', s3Router);


router.use('/order', orderRouter);


module.exports = router;