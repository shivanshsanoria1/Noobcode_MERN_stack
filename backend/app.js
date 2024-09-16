const path = require('path')

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const dbConnection = require('./config/dbConnection')
const corsOptions = require('./config/corsOptions')
const solutionRoutes = require('./routes/solution')
const algoRoutes = require('./routes/algorithm')
const errorHandler  = require('./middleware/errorHandler')
const syncSolutions = require('./util/syncSolutions')
const syncAlgos = require('./util/syncAlgorithms')
const generateSolutionStats = require('./util/generateSolutionStats')

const PORT = process.env.PORT || 8000
const MODE = process.env.NODE_ENV || 'development'

const app = express()

// if(MODE !== 'production') {
//   app.use(cors(corsOptions))
// }

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/solutions', solutionRoutes)
app.use('/algos', algoRoutes)

// Serve frontend in production mode
if (MODE === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.status(200).sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
  )
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server Started in ${MODE} mode at port ${PORT} at time: ${new Date().toISOString()}`)
})

dbConnection()

mongoose.connection.once('open', () => {
  console.log(`Mongodb Connected at: ${new Date().toISOString()}`)
})

if(process.env.SYNC_FILES === 'true'){
  (async function(){
    await syncSolutions()
    await syncAlgos()
    await generateSolutionStats()
  })()
}