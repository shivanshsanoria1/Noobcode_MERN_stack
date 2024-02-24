const allowedOrigins = [
  'http://localhost:8000',
  'http://127.0.0.1:8000'
]

const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.indexOf(origin) !== -1){
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET'],
  credentials: true,
  optionsSuccessStatus: 200
}

module.exports = { corsOptions }