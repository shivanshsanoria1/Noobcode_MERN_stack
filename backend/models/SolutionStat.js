const { Schema, model } = require('mongoose')

const solutionStatSchema = new Schema({
  solvedCountCPP: {
    type: Number,
    default: 0
  },
  solvedCountJS: {
    type: Number,
    default: 0
  },
  solvedCountSQL: {
    type: Number,
    default: 0
  },
  partialSolvedCountCPP: {
    type: Number,
    default: 0
  },
  maxQuesId: {
    type: Number,
    default: 0
  },
  acceptedQuesIds: [{
    type: Number
  }],
  unacceptedQuesIds: [{
    type: Number
  }]
}, {
  timestamps: true
})

module.exports = model('SolutionStat', solutionStatSchema)