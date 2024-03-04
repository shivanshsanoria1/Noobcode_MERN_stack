const allowedOrigins = [
  'http://localhost:3000', 
  'http://127.0.0.1:3000'
]

const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.indexOf(origin) !== -1){
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET']
}

module.exports = corsOptions 