const { Schema, model } = require('mongoose')

const algoSchema = new Schema({
  customId: {
    type: String,
    length: 13,
    required: true
  },
  title: {
    type: String,
    maxLength: 100,
    required: true
  },
  language: {
    type: String,
    maxLength: 10,
    lowercase: true,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }, 
  linkedAlgos: {
    prerequisiteAlgo: {
      id: {
        type: String
      },
      title: {
        type: String
      }
    },
    similarAlgo: {
      id: {
        type: String
      },
      title: {
        type: String
      }
    },
    followupAlgo: {
      id: {
        type: String
      },
      title: {
        type: String
      }
    }
  }
}, {
  timestamps: true
})

module.exports = model('Algorithm', algoSchema)