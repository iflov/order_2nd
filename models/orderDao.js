const { database } = require('./dataSource');

const getOrder = async ( userId , roomId, checkIn, checkOut, pointChange ) => {
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

    const getUserPointByUserId = async ( userId ) =>
    {
      return await database.query(`
    SELECT point
      FROM users
      WHERE id=${userId}
    `)
      }

    const getRoomPriceByRoomId = async( roomId ) =>{ 
      return await database.query(`
    SELECT price
      FROM rooms
      WHERE id=${roomId}
    `)
    }


  // 해당 시간 예약중인 상태의 order가 있다면 예약되면 안되는 로직 구현( service ) / users.price 받아와서 update 해야함
  // 함수명 createOrder 변경
  


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

const deleteOrder = async ( orderId, orderStatusEnums ) => {
  await database.query(`
    UPDATE orders
      SET orders.order_status_id=${orderStatusEnums}
      WHERE id=${orderId}
  `)
  await database.query(`
  
  `)
// user point 돌려주기 ( 예약취소 > 돌려주기)
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

module.exports = { getOrder, deleteOrder, getOrderByOrderId, getAllOrderByUserId, getUserPointByUserId, getRoomPriceByRoomId };