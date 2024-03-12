const path = require('path')
const fs = require('fs')
const { readdir, readFile } = require('node:fs/promises')

const Solution = require('../models/solution')
const SolutionStat = require('../models/SolutionStat')

async function solutionStatUpdate() {
  try{
    console.log(`File Stat Update Started at: ${new Date().toISOString()}`)

    const solutions = await Solution.find({})

    let solvedCountCPP = 0;
    let solvedCountJS = 0;
    let solvedCountSQL = 0;
    let partialSolvedCountCPP = 0;
    const acceptedQuesIds = [];
    const unacceptedQuesIds = [];

    for(const solution of solutions) {
      if(solution.language === 'cpp') {
        if(solution.acceptedSolutions.length > 0) {
          solvedCountCPP++;
        } else {
          partialSolvedCountCPP++;
        }
      } else if(solution.language === 'js') {
        solvedCountJS++;
      } else if(solution.language === 'sql') {
        solvedCountSQL++;
      }

      if(solution.acceptedSolutions.length > 0) {
        acceptedQuesIds.push(solution.quesId)
      } else {
        unacceptedQuesIds.push(solution.quesId)
      }
    }

    await SolutionStat.deleteMany({})

    await SolutionStat.create({
      solvedCountCPP,
      solvedCountJS,
      solvedCountSQL,
      partialSolvedCountCPP,
      acceptedQuesIds,
      unacceptedQuesIds
    })

    console.log(`File Stat Update Completed at: ${new Date().toISOString()}`) 

  }catch(err){
    console.log('ERROR: solutionStatUpdate()')
    console.log(err)
  }
}

function readAllFiles() {
  return new Promise(async (resolve, reject) => {
    try{
      const solutionsDirPath_cpp_1_500 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [1-500]')
      const solutionsDirPath_cpp_501_1000 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [501-1000]')
      const solutionsDirPath_cpp_1001_1500 = path.join(__dirname, '..', '..','LeetcodeSolutions', 'CPP [1001-1500]')
      const solutionsDirPath_cpp_1501_2000 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [1501-2000]')
      const solutionsDirPath_cpp_2001_2500 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [2001-2500]')
      const solutionsDirPath_cpp_2501_3000 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [2501-3000]')
      const solutionsDirPath_cpp_3001_3500 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [3001-3500]')
      const solutionsDirPath_js = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'JS')
      const solutionsDirPath_sql = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'SQL')
  
      const solutionsDirPaths = [
        solutionsDirPath_cpp_1_500,
        solutionsDirPath_cpp_501_1000,
        solutionsDirPath_cpp_1001_1500,
        solutionsDirPath_cpp_1501_2000,
        solutionsDirPath_cpp_2001_2500,
        solutionsDirPath_cpp_2501_3000,
        solutionsDirPath_cpp_3001_3500,
        solutionsDirPath_js, 
        solutionsDirPath_sql
      ]
  
      const solutionsMap = new Map([])
  
      for(const solutionsDirPath of solutionsDirPaths){
        const fileNames = await readdir(solutionsDirPath)
  
        for(const fileName of fileNames){
          const solutionFilePath = path.join(solutionsDirPath, fileName)
  
          const quesId = parseInt(fileName.split('.')[0])
          const title = fileName.split('.')[1].split(' ')[0].split('_').join(' ')
          const language = path.extname(solutionFilePath).substring(1)
          const isAccepted = fileName.search('TLE') === -1 && fileName.search('MLE') === -1
          const fileNameWithoutExt = fileName.split('.')[1]
          const version = parseInt(fileNameWithoutExt[fileNameWithoutExt.length - 2])
          
          const fileData = await readFile(solutionFilePath, 'utf8')
          
          let solution = null
          if(!solutionsMap.has(quesId)){
            solution = {
              quesId,
              title,
              language,
              acceptedSolutions: [],
              unacceptedSolutions: []
            }
          }else{
            solution = solutionsMap.get(quesId)
          }
  
          if(isAccepted){
            solution.acceptedSolutions[version - 1] = fileData
          }else{
            solution.unacceptedSolutions[version - 1] =  fileData
          }
  
          solutionsMap.set(quesId, solution)
        }
      }
  
      const solutionsArray = []
      for(const [key, value] of solutionsMap){
        const { title, language, acceptedSolutions, unacceptedSolutions } = value
        solutionsArray.push({
          quesId: key,
          title,
          language,
          acceptedSolutions,
          unacceptedSolutions
        })
      }
  
      resolve(solutionsArray)
  
    }catch(err){
      console.log('ERROR: readAllFiles()')
      console.log(err)
      reject()
    }
  })
    
}

async function syncAllSolutions() {
  try{
    const startTime = Date.now()
    console.log(`File Sync Started at: ${new Date().toISOString()}`)

    const solutionsArray = await readAllFiles()
    
    await Solution.deleteMany({})
    await Solution.insertMany(solutionsArray, {ordered: false})

    console.log(`File Sync Completed at: ${new Date().toISOString()}`)
    const endTime = Date.now()
    console.log(`Time Taken to Sync Files = ${endTime - startTime} ms`)

    solutionStatUpdate() 

  }catch(err){
    console.log('ERROR: syncAllSolutions()')
    console.log(err)
  }
}

module.exports = syncAllSolutions