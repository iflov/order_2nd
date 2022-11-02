const orderDao = require('../models/orderDao');
const orderStatusEnums = require('../models/enums');

const getOrder = async (userId , roomId, checkIn, checkOut) => {
  
  const getRoomPriceByRoomId = await orderDao.getRoomPriceByRoomId( roomId );
  // console.log({roomPrice:getRoomPriceByRoomId[0].price})
  const getUserPointByUserId = await orderDao.getUserPointByUserId( userId );
  // console.log({userPoint:+getUserPointByUserId[0].point})
  
  let pointChange = +getUserPointByUserId[0].point - +getRoomPriceByRoomId[0].price;
  // console.log(pointChange)
if( +getUserPointByUserId === 0 ){
  const err = new Error('USER_POINT_IS_EMPTY');
  err.statusCode = 400;
  throw err;
}

if( pointChange < 0){
  const err = new Error('PLEASE_ADD_YOUR_POINT');
  err.statusCode = 400;
  throw err;
}

if( pointChange > 0 ) {


  const orderData = await orderDao.getOrder( +userId , +roomId, checkIn, checkOut , pointChange );
  
  
  return orderData;
}

}

const deleteOrder = async ( orderId ) => {
  await orderDao.deleteOrder( +orderId, orderStatusEnums.CANCELED_ORDER_STATUS_ID );

}

const getOrderByOrderId = async ( orderId ) => {
  return await orderDao.getOrderByOrderId( +orderId );
}

const getAllOrderByUserId = async ( productId, roomId, orderStatus ) => {
  return await orderDao.getAllOrderByUserId( +productId, +roomId , +orderStatus)
}



module.exports = { getOrder, deleteOrder, getOrderByOrderId, getAllOrderByUserId }