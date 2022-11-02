const express = require('express');
const router = express.Router();
const  orderController  = require('../controllers/orderController');

router.get('/search', orderController.getOrderByOrderId);
router.get('/searchAll', orderController.getAllOrderByUserId);
router.post('/order' , orderController.getOrder);
router.patch('/:orderId', orderController.deleteOrder);

module.exports =  router 