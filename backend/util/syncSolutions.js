const path = require('path')
const fs = require('fs')
const { readdir, readFile } = require('node:fs/promises')

const Solution = require('../models/solution')
const SolutionStat = require('../models/SolutionStat')

function readCodeFiles() {
  return new Promise(async (resolve, reject) => {
    try{
      const dirPath_cpp_1_500 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [1-500]')
      const dirPath_cpp_501_1000 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [501-1000]')
      const dirPath_cpp_1001_1500 = path.join(__dirname, '..', '..','LeetcodeSolutions', 'CPP [1001-1500]')
      const dirPath_cpp_1501_2000 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [1501-2000]')
      const dirPath_cpp_2001_2500 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [2001-2500]')
      const dirPath_cpp_2501_3000 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [2501-3000]')
      const dirPath_cpp_3001_3500 = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'CPP [3001-3500]')
      const dirPath_js = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'JS')
      const dirPath_sql = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'SQL')
  
      const dirPaths = [
        dirPath_cpp_1_500,
        dirPath_cpp_501_1000,
        dirPath_cpp_1001_1500,
        dirPath_cpp_1501_2000,
        dirPath_cpp_2001_2500,
        dirPath_cpp_2501_3000,
        dirPath_cpp_3001_3500,
        dirPath_js, 
        dirPath_sql
      ]
  
      const solutionsMap = new Map([])
  
      for(const dirPath of dirPaths){
        const fileNames = await readdir(dirPath)
  
        for(const fileName of fileNames){
          const filePath = path.join(dirPath, fileName)
  
          const quesId = parseInt(fileName.split('.')[0])
          const title = fileName.split('.')[1].split(' ')[0].split('_').join(' ')
          const language = path.extname(filePath).substring(1)
          const isAccepted = fileName.search('TLE') === -1 && fileName.search('MLE') === -1
          const fileNameWithoutExt = fileName.split('.')[1]
          const version = parseInt(fileNameWithoutExt[fileNameWithoutExt.length - 2])
          
          const fileData = await readFile(filePath, 'utf8')
          
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
            
            // skip the curr language solution if a solution already exists in another language
            if(solution.language !== language){
              continue
            }
          }
  
          if(isAccepted){
            solution.acceptedSolutions[version - 1] = fileData
          }else{
            solution.unacceptedSolutions[version - 1] =  fileData
          }
  
          solutionsMap.set(quesId, solution)
        }
      }
  
      resolve(solutionsMap)
  
    }catch(err){
      console.log(err)
      reject()
    }
  })
}

function convertMapToArray(solutionsMap){
  try{
    const solutionsArray = []

    for(const solution of solutionsMap.values()){
      const { quesId, title, language, acceptedSolutions, unacceptedSolutions } = solution

      solutionsArray.push({
        quesId,
        title,
        language,
        acceptedSolutions,
        unacceptedSolutions
      })
    }

    return solutionsArray

  }catch(err){
    console.log(err)
  }
}

async function solutionStatUpdate() {
  try{
    console.log(`File Stat Update Started at: ${new Date().toISOString()}`)

    const solutions = await Solution.find({})

    let solvedCountCPP = 0
    let solvedCountJS = 0
    let solvedCountSQL = 0
    let partialSolvedCountCPP = 0
    let maxQuesId = 0
    const acceptedQuesIds = []
    const unacceptedQuesIds = []

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

      maxQuesId = Math.max(maxQuesId, solution.quesId)

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
      maxQuesId,
      acceptedQuesIds,
      unacceptedQuesIds
    })

    console.log(`File Stat Update Completed at: ${new Date().toISOString()}`) 

  }catch(err){
    console.log(err)
  }
}

function syncSolutions() {
  return new Promise(async (resolve, reject) => {
    try{
      const startTime = Date.now()
      console.log(`File Sync Started at: ${new Date().toISOString()}`)
  
      const solutionsMap = await readCodeFiles()
      const solutionsArray = convertMapToArray(solutionsMap)
      
      await Solution.deleteMany({})
      await Solution.insertMany(solutionsArray, {ordered: false})
  
      console.log(`File Sync Completed at: ${new Date().toISOString()}`)
      const endTime = Date.now()
      console.log(`Time Taken to Sync Files = ${endTime - startTime} ms`)
  
      solutionStatUpdate() 
      
      resolve()

    }catch(err){
      console.log(err)
      reject()
    }
  })
}

module.exports = syncSolutions