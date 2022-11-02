const { DataSource } = require('typeorm');

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

const databaseInit = async () => {
  await database.initialize()
  .then(() => {
    console.log('Data Source is initialized')
  })
  .catch((err) => {
    console.error('Error occured during Data Source initialization' , err);
    database.destroy();
  })
  
}

databaseInit();

module.exports = { database };