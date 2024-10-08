const Solution = require('../models/solution')
const SolutionStat = require('../models/SolutionStat')

exports.getSolution = async (req, res) => {
  try{
    const ques_id = parseInt(req.query.ques_id)
    // verify ques id is a integer
    if(typeof ques_id !== 'number' || ques_id !== parseInt(ques_id)){
      res.status(400).json({
        found: false,
        errMsg: 'Invalid Question Number' 
      })
      return
    }
    
    const solution = await Solution.findOne({ quesId: ques_id })

    if(!solution){
      res.status(404).json({ 
        found: false, 
        msg: "solution not found :("
      })
      return
    }

    const { quesId, title, language, acceptedSolutions, unacceptedSolutions } = solution

    res.status(200).json({
      found: true,
      quesId,
      title,
      language,
      acceptedSolutions,
      unacceptedSolutions
    })

  }catch(err){
    console.log(err)
    res.status(500).json({ 
      msg: 'Something went wrong' 
    })
  }
}

exports.getSolutionStats = async(req, res) => {
  try{
    const { 
      solvedCountCPP, 
      solvedCountJS, 
      solvedCountSQL, 
      partialSolvedCountCPP, 
      maxQuesId,
      acceptedQuesIds, 
      unacceptedQuesIds 
    } = await SolutionStat.findOne({})

    res.status(200).json({
      solvedCountCPP, 
      solvedCountJS, 
      solvedCountSQL, 
      partialSolvedCountCPP, 
      maxQuesId,
      acceptedQuesIds, 
      unacceptedQuesIds
    })
    
  }catch(err){
    console.log(err)
    res.status(500).json({ 
      msg: 'Something went wrong' 
    })
  }
}