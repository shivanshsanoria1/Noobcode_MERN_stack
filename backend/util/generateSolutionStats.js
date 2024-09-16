const path = require('node:path');
const { readdir, writeFile } = require('node:fs/promises');

function readSolutionStats(){
  return new Promise(async(resolve, reject) => {
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

      const solutionsStatMap = new Map()

      for(const dirPath of dirPaths){
        const fileNames = await readdir(dirPath)
  
        for(const fileName of fileNames){
          const filePath = path.join(dirPath, fileName)
  
          const quesId = parseInt(fileName.split('.')[0])
          const title = fileName.split('.')[1].split(' ')[0].split('_').join(' ')
          const language = path.extname(filePath).substring(1).toLowerCase()
          const isAccepted = fileName.search('TLE') === -1 && fileName.search('MLE') === -1
          
          let solutionstats = null
          
          if(!solutionsStatMap.has(quesId)){
            solutionstats = {
              quesId,
              title,
              language,
              acceptedSolutionsCount: isAccepted ? 1 : 0,
              unacceptedSolutionsCount: isAccepted ? 0 : 1
            }
          }else{
            solutionstats = solutionsStatMap.get(quesId)

            if(isAccepted){
              solutionstats.acceptedSolutionsCount++
            }else{
              solutionstats.unacceptedSolutionsCount++
            }

            // solution in multiple languages
            if(solutionstats.language.indexOf(language) === -1){
              solutionstats.language += '*' + language
            }
          }

          solutionsStatMap.set(quesId, solutionstats)
        }
      }
      
      resolve(solutionsStatMap)

    }catch(err){
      console.log(err)
      reject()
    }
  })
}

function convertMapToArray(mp){
  const arr = []
  for(const [quesId, obj] of mp){
    arr.push(obj)
  }

  return arr.sort((a, b) => a.quesId - b.quesId)
}

function writeSolutionStatsToCSV(solutionsStatArray) {
  return new Promise(async(resolve, reject) => {
    try{
      let solutionsStatsStringified = 'quesId,Title,Language,AcceptedSolutionsCount,UnacceptedSolutionsCount\n'

      for(const solutionStats of solutionsStatArray){
        const {
          quesId, 
          title, 
          language, 
          acceptedSolutionsCount, 
          unacceptedSolutionsCount
        } = solutionStats

        const titleWithOutCommas = title.replace(/,/g, '*')
        
        solutionsStatsStringified += `${quesId},${titleWithOutCommas},${language},${acceptedSolutionsCount},${unacceptedSolutionsCount}\n`
      }
  
      const csvFilePath = path.join(__dirname, '..' , '..', 'LeetcodeSolutions', 'helper', 'metadata', 'solutionStats_metadata.csv')
      await writeFile(csvFilePath, solutionsStatsStringified)

      resolve()

    }catch(err){
      console.log(err)
      reject()
    }
  })
}

function generateSolutionStats() {
  return new Promise(async(resolve, reject) => {
    try{
      const startTime = Date.now()
      console.log(`Solutions Stat Generation Started at: ${new Date().toISOString()}`)

      const solutionsStatMap = await readSolutionStats()
      const solutionsStatArray = convertMapToArray(solutionsStatMap)
  
      await writeSolutionStatsToCSV(solutionsStatArray)

      console.log(`Solutions Stat Generation Completed at: ${new Date().toISOString()}`)
      const endTime = Date.now()
      console.log(`Time Taken to Generate Solution stats = ${endTime - startTime} ms`)

      resolve()
  
    }catch(err){
      console.log(err)
      reject()
    }
  })
}

module.exports = generateSolutionStats