const orderService = require('../services/orderService');

const getOrder = async( req, res )=> {
  // const userId = req.user;
  const { userId , roomId, checkIn, checkOut } = req.body;
  const orderData = await orderService.getOrder( userId, roomId, checkIn, checkOut );

  res.status(200).json({message : "RESERVATION COMPLETE"});
}

const deleteOrder = async ( req, res )=> {
  const { orderId } = req.params;
  await orderService.deleteOrder( orderId );

  res.status(200).json({ message: "DELETE SUCCESS"});
}

const getOrderByOrderId = async ( req, res )=> {
  const { orderId } = req.query
  const orderByUserId = await orderService.getOrderByOrderId( orderId );

  res.status(200).json({ orderByUserId });
}

const getAllOrderByUserId = async( req, res )=> {
  const { orderStatus } = req.query;
  const { productId, roomId } = req.body;
  const allOrderByUserId = await orderService.getAllOrderByUserId( productId, roomId, orderStatus );

  res.status(200).json({allOrderByUserId})
}
module.exports = { getOrder, deleteOrder, getOrderByOrderId, getAllOrderByUserId };