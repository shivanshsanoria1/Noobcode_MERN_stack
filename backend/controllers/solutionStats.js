const SolutionStat = require('../models/SolutionStat')

exports.getSolutionStats = async(req, res) => {
  try{
    const { 
      solvedCountCPP, 
      solvedCountJS, 
      solvedCountSQL, 
      partialSolvedCountCPP, 
      acceptedQuesIds, 
      unacceptedQuesIds 
    } = await SolutionStat.findOne({})

    res.status(200).json({
      solvedCountCPP, 
      solvedCountJS, 
      solvedCountSQL, 
      partialSolvedCountCPP, 
      acceptedQuesIds, 
      unacceptedQuesIds
    })
    
  }catch(err){
    console.log('ERROR: getSolutionStats()')
    console.log(err)
    res.status(500).json({ 
      msg: 'Something went wrong' 
    })
  }
}