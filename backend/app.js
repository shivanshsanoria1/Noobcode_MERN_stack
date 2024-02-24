const path = require('path')

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
//const cors = require('cors')
const cron = require('node-cron')

const solutionRoutes = require('./routes/solution')
const solutionStatsRoutes = require('./routes/solutionStats')
const { get404 } = require('./middleware/errorHandler')
//const { corsOptions } = require('./config/corsOptions')
const { syncAllSolutions } = require('./util/syncAllSolutions')

const PORT = process.env.PORT || 8000

const app = express()

//app.use(cors(corsOptions))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/solutions', solutionRoutes)
app.use('/solution-stats', solutionStatsRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.status(200).sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
  )
}

app.all('*', get404)

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT} at time: ${new Date().toISOString()}`)
})


const MONGODB_CONNECTION_URI = process.eventNames.MONGODB_CONNECTION_URI
mongoose
.connect('mongodb://127.0.0.1:27017/noobcode_local')
.then(() => {
	console.log(`mongodb connected at: ${new Date().toISOString()}`)
})
.catch((err) => {
  console.log('MONGODB CONNECTION ERROR')
  console.log(err)
});

// sync all solutions with database at 00:00:00 everyday
cron.schedule('0 0 0 * * *', () => {
  console.log(`Cron Job Started at: ${new Date().toISOString()}`)
  syncAllSolutions()
})

//syncAllSolutions()