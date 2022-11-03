const { database } = require('./dataSource');
const orderStatusEnums = require('./enums');

const createOrder = async ( userId , roomId, checkIn, checkOut, pointChange ) => {
  await database.query ( `
    INSERT INTO orders
      (user_id,
        room_id,
        check_in_date,
        check_out_date)
      VALUES
      (?,?,?,?)
  `,[ userId, roomId, checkIn, checkOut ])

  await database.query(`
  
    UPDATE users
    SET point=${pointChange}
    WHERE id=${userId}
  `)

  }

const getAllOrderByUserId = async( productId, roomId, orderStatus ) => {
  const allOrderByUserId =  await database.query(`
  SELECT
    rooms.thumbnail_url AS thumbnail,
    products.name AS productName,
    rooms.name AS roomName,
    order_statuses.description AS description,
    orders.id AS orderId,
    orders.check_in_date AS checkIn,
    orders.check_out_date AS checkOut
    FROM orders
    JOIN order_statuses ON orders.order_status_id=order_statuses.id
    JOIN rooms ON orders.room_id=rooms.id
    JOIN products ON products.id=rooms.product_id
    WHERE rooms.id = ${roomId} AND products.id=${productId} AND order_statuses.id=${orderStatus}
  `)

  return allOrderByUserId
}

const deleteOrder = async ( orderId, userId, roomPrice ) => {

  await database.query(`
  UPDATE orders
    SET order_status_id=${orderStatusEnums.CANCELED_ORDER_STATUS_ID}
    WHERE id = ${orderId} AND user_id=${userId}
  
  `)
  await database.query(`
  UPDATE users
    SET point=point+${roomPrice}
  WHERE id=${userId}
  `)
}

const getRoomPriceByRoomId = async ( roomId )=> {
  return await database.query(`
  SELECT
    price
  FROM rooms
  WHERE id=${roomId}
  `)
}

const getCheckInDateByOrderId = async ( orderId )=>{
  return await database.query(`
  SELECT 
    check_out_date
  FROM orders
  WHERE id=${orderId}
  
  `)
}

const getOrderByOrderId = async ( orderId )=> {
  return await database.query(`
  SELECT
    products.name AS productName,
    rooms.name AS name,
    orders.check_in_date AS checkIn,
    orders.check_out_date AS checkOut,
    rooms.price AS price,
    order_statuses.description AS orderStatus,
    orders.id AS orderId,
    users.nickname AS userName
    FROM orders
    JOIN rooms ON rooms.id=orders.room_id
    JOIN products ON products.id=rooms.product_id
    JOIN order_statuses ON orders.order_status_id=order_statuses.id
    JOIN users ON users.id=orders.user_id
    WHERE orders.id=${orderId}
  
  `)

}

const getDifferenceByOrderId = async (orderId) => {
  return await database.query(`
  SELECT 
    id, 
    check_in_date, 
    DATEDIFF(CURDATE(), check_in_date) AS diffDate
    FROM goodplace.orders
    WHERE id=${orderId}
  
  `)
}

const getOrderStatus = async ( orderId ) => {
  return await database.query(`
  SELECT 
    order_status_id AS orderStatus
  FROM orders
  WHERE id=${orderId}
  
  `)
}

const getUserPointByUserId = async ( userId ) => {
  return await database.query(`
  SELECT
    point
  FROM users
  WHERE id=${userId}
  `)
}

module.exports = { 
  createOrder, 
  deleteOrder, 
  getOrderByOrderId, 
  getAllOrderByUserId, 
  getCheckInDateByOrderId,
  getDifferenceByOrderId,
  getRoomPriceByRoomId,
  getOrderStatus,
  getUserPointByUserId
};