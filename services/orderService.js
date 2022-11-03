const orderDao = require('../models/orderDao');
const orderStatusEnums = require('../models/enums');

const createOrder = async ( userId, roomId, checkIn, checkOut ) => {
  
  const getRoomPriceByRoomId = await orderDao.getRoomPriceByRoomId( +roomId );
  
  const getUserPointByUserId = await orderDao.getUserPointByUserId( +userId );
 

  
  let pointChange = Number(getUserPointByUserId[0].point) - Number(getRoomPriceByRoomId[0].price);

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


  const orderData = await orderDao.createOrder( +userId , +roomId, checkIn, checkOut , pointChange, orderStatusEnums.RESERVATE_ON_ORDER_STATUS_ID );
  
  
  return orderData;
}

}

const deleteOrder = async ( orderId, userId, roomId ) => {

  const getOrderStatusIdByOrderId = await orderDao.getOrderStatus(+orderId);

if(getOrderStatusIdByOrderId[0].orderStatus === orderStatusEnums.RESERVATE_ON_ORDER_STATUS_ID){

  const getDifferenceByOrderId = await orderDao.getDifferenceByOrderId(+orderId);

  const diffOfCheckInFromNow = +getDifferenceByOrderId[0].diffDate

  const roomPriceObject = await orderDao.getRoomPriceByRoomId( +roomId );

  const roomPrice = roomPriceObject[0].price

  if(diffOfCheckInFromNow === -1 || diffOfCheckInFromNow === 0){

    await orderDao.deleteOrder( +orderId, +userId, +(roomPrice/2) )
  }

  else if(diffOfCheckInFromNow < -1){
    await orderDao.deleteOrder( +orderId, +userId, +roomPrice );
  }else{
    const error = new Error('YOU_CAN_NOT_CANCEL');
    error.statusCode = 400;
    throw error;
  }
}else{
  const error = new Error('Youcannot cancel')
  error.statusCode = 400;
  throw error;
}
}
const getOrderByOrderId = async ( orderId ) => {
  return await orderDao.getOrderByOrderId( +orderId );
}

const getAllOrderByUserId = async ( productId, roomId, orderStatus ) => {

  return await orderDao.getAllOrderByUserId( +productId, +roomId , +orderStatus)
}



module.exports = { createOrder, deleteOrder, getOrderByOrderId, getAllOrderByUserId }