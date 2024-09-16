const {ObjectId} = require('mongoose').Types

const Algorithm = require('../models/algorithm')

exports.getAllAlgorithms =  async (req, res) => {
  try{
    const allAlgosFromDB = await Algorithm.find({})
    
    const allAlgos = allAlgosFromDB.map((algo) => ({
      id: algo._id,
      title: algo.title,
      language: algo.language,
      difficulty: algo.difficulty
    }))

    res.status(200).json(allAlgos)

  }catch(err){
    console.log('ERROR: getAllAlgorithms()')
    console.log(err)
    res.status(500).json({ 
      msg: 'Something went wrong' 
    })
  }
}


exports.getAlgorithm = async (req, res) => {
  try{
    const algo_id = req.query.algo_id

    if(!ObjectId.isValid(algo_id)){
      res.status(404).json({ 
        found: false, 
        msg: "Invalid ID"
      })
      return
    }

    const algo = await Algorithm.findById(algo_id)

    if(!algo){
      return res.status(404).json({
        found: false,
        msg: 'Algorithm not found :('
      })
    }

    const {title, language, description, code, linkedAlgos} = algo
    const {prerequisiteAlgo, similarAlgo, followupAlgo} = linkedAlgos

    res.status(200).json({
      id: algo._id.toString(),
      title,
      language,
      description,
      code,
      linkedAlgos: {
        prerequisiteAlgo,
        similarAlgo,
        followupAlgo
      }
    })

  }catch(err){
    console.log(err)
    res.status(500).json({ 
      msg: 'Something went wrong' 
    })
  }
}