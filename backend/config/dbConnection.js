const mongoose = require('mongoose')

async function dbConnection() {
  try{
    const MONGODB_LOCAL_DB_NAME = process.env.MONGODB_LOCAL_DB_NAME || 'noobcode_local'
    const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI || `mongodb://127.0.0.1:27017/${MONGODB_LOCAL_DB_NAME}`
    
    await mongoose.connect(MONGODB_CONNECTION_URI)
  } catch(err) {
    console.log('MONGODB CONNECTION ERROR')
    console.log(err)
  }
}

module.exports = dbConnection
