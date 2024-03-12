const path = require('path')

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const dbConnection = require('./config/dbConnection')
const corsOptions = require('./config/corsOptions')
const solutionRoutes = require('./routes/solution')
const solutionStatsRoutes = require('./routes/solutionStats')
const errorHandler  = require('./middleware/errorHandler')
const syncAllSolutions = require('./util/syncAllSolutions')

const PORT = process.env.PORT || 8000

const app = express()

if(process.env.NODE_ENV !== 'production') {
  app.use(cors(corsOptions))
}

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/solutions', solutionRoutes)
app.use('/solution-stats', solutionStatsRoutes)

// Serve frontend in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.status(200).sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
  )
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server Started in ${process.env.NODE_ENV} mode at port ${PORT} at time: ${new Date().toISOString()}`)
})

dbConnection()

mongoose.connection.once('open', () => {
  console.log(`Mongodb Connected at: ${new Date().toISOString()}`)
})

if(process.env.SYNC_FILES === 'true'){
  syncAllSolutions()
}