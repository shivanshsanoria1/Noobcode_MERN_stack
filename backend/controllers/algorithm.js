const {ObjectId} = require('mongoose').Types

const Algorithm = require('../models/algorithm')

exports.getAllAlgorithms =  async (req, res) => {
  try{
    const allAlgosFromDB = await Algorithm.find({})
    
    const allAlgos = allAlgosFromDB.map((algo) => ({
      id: algo._id,
      title: algo.title,
      language: algo.language,
      // random number in range [1, 5]
      //difficulty: Math.floor(Math.random()*(5-0) + 1)
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

    res.status(200).json({
      id: algo._id.toString(),
      title: algo.title,
      language: algo.language,
      description: algo.description,
      code: algo.code
    })

  }catch(err){
    console.log('ERROR: getAlgorithm()')
    console.log(err)
    res.status(500).json({ 
      msg: 'Something went wrong' 
    })
  }
}