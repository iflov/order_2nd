const { database } = require('typeorm');

const register = async ( commentId, s3ImageUrl ) => {
  const registerImageUrl = await database.query(`
    INSERT INTO 
  `)
}
