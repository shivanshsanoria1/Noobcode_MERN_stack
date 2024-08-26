const { Schema, model } = require('mongoose')

const algoSchema = new Schema({
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
  }
}, {
  timestamps: true
})

module.exports = model('Algorithm', algoSchema)