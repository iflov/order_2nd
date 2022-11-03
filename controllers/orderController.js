const orderService = require('../services/orderService');
const { catchAsync } = require('../utils/error');

const createOrder = catchAsync(async( req, res )=> {
  // const userId = req.user;
  const { userId , roomId, checkIn, checkOut } = req.body;
  await orderService.createOrder( userId, roomId, checkIn, checkOut );

  res.status(200).json({message : "RESERVATION COMPLETE"});
})

const deleteOrder = catchAsync(async ( req, res )=> {
  const { orderId , userId, roomId } = req.query;
  await orderService.deleteOrder( orderId, userId, roomId );

  res.status(200).json({ message: "DELETE SUCCESS"});
})

const getOrderByOrderId = catchAsync(async ( req, res )=> {
  const { orderId } = req.query;
  const { userId } = req.body;
  const orderByUserId = await orderService.getOrderByOrderId( orderId, userId );

  res.status(200).json({ orderByUserId });
})

const getAllOrderByUserId = catchAsync(async( req, res )=> {
  const { orderStatus } = req.query;
  const { productId, roomId } = req.body;
  const allOrderByUserId = await orderService.getAllOrderByUserId( productId, roomId, orderStatus );

  res.status(200).json({allOrderByUserId})
})
module.exports = { createOrder, deleteOrder, getOrderByOrderId, getAllOrderByUserId };