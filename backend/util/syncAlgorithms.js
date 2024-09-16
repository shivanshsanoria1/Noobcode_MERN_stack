const path = require('path')
const { readdir, readFile } = require('node:fs/promises')

const Algorithm = require('../models/algorithm')

function readFromCSV() {
  return new Promise(async (resolve, reject) => {
    try {
      const csvFilePath = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'helper', 'metadata', 'algorithms_metadata.csv')
      const csvData = await readFile(csvFilePath, { encoding: 'utf8' });

      const data = csvData.split('\n').map((row) => 
        row
        .replaceAll(/,_/g, ';_')
        .replaceAll(/"/g, '')
        .replace('\r', '')
        .split(',')
      )
      // remove the last empty row
      data.pop()

      const algoMap = new Map()

      for(let i=1; i<data.length; i++){
        const customId = data[i][0]
        const fileNameWithoutExt = data[i][1].replaceAll(/;/g, ',')
        const difficulty = parseInt(data[i][2])
        const prerequisiteId = data[i][3]
        const similarId = data[i][4]
        const followupId = data[i][5]
        
        algoMap.set(customId, {
          customId,
          title: fileNameWithoutExt.split('_').join(' '),
          difficulty,
          linkedAlgos: {
            prerequisiteAlgo: {
              id: prerequisiteId,
              title: ''
            },
            similarAlgo: {
              id: similarId,
              title: ''
            },
            followupAlgo: {
              id: followupId,
              title: ''
            },
          }
        })
      }

      resolve(algoMap)
        
    } catch(err) {
      console.log(err);
      reject()
    }
  })
}

function readCodeFiles(algoMap){
  return new Promise(async (resolve, reject) => {
    try{
      const dirPath = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'helper')

      const fileNames_withDirs = await readdir(dirPath, { withFileTypes: true })
      const fileNames = fileNames_withDirs
      .filter((fileName) => fileName.isFile())
      .map((dirent) => dirent.name)

      for(const fileName of fileNames){
        const filePath = path.join(dirPath, fileName)

        const customId = fileName.substring(fileName.indexOf('[') + 1, fileName.indexOf(']'))
        const language = path.extname(filePath).substring(1)

        const fileData = await readFile(filePath, { encoding: 'utf8' })

        if(!algoMap.has(customId)){
          throw new Error(`File << ${fileName} >> not found in .csv file`)
        }
        
        const algoObj = algoMap.get(customId)
        algoMap.set(customId, {
          ...algoObj,
          language,
          code: fileData
        })
      }

      resolve()

    }catch(err){
      console.log(err)
      reject()
    }
  })
}

function readMarkdownFiles(algoMap) {
  return new Promise(async(resolve, reject) => {
    try{
      const dirPath = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'helper', 'markdown')

      const fileNames = await readdir(dirPath)

      for(const fileName of fileNames){
        const filePath = path.join(dirPath, fileName)
        
        const customId = fileName.substring(fileName.indexOf('[') + 1, fileName.indexOf(']'))

        const fileData = await readFile(filePath, { encoding: 'utf8' })

        if(!algoMap.has(customId)){
          throw new Error(`File << ${fileName} >> not found in .csv file`)
        }
        
        const algoObj = algoMap.get(customId)
        algoMap.set(customId, {
          ...algoObj,
          description: fileData === '' ? '## Description not available.' : fileData
        })
      }

      resolve()

    }catch(err){
      console.log(err)
      reject()
    }
  })
}

function convertMapToArray(mp){
  const arr = []
  for(const [customId, obj] of mp){
    arr.push({
      customId,
      ...obj
    })
  }

  return arr
}

function convert_customIds_to_DBIds_in_linkedAlgos(){
  return new Promise(async(resolve, reject) => {
    try{
      const algos = await Algorithm.find()

      for(const algo of algos){
        for(const key in algo.linkedAlgos){
          if(algo.linkedAlgos.hasOwnProperty(key)){
            const linkedCustomId = algo.linkedAlgos[key].id

            if(linkedCustomId === ''){
              continue
            }

            const linkedAlgoObj = await Algorithm.findOne({customId: linkedCustomId})

            algo.linkedAlgos[key].id = linkedAlgoObj._id.toString()
            algo.linkedAlgos[key].title = linkedAlgoObj.title
            await algo.save()
          }
        }
      }

      resolve()

    }catch(err){
      console.log(err)
      reject()
    }
  })
}

function syncAlgos(){
  return new Promise(async(resolve, reject) => {
    try{
      const startTime = Date.now()
      console.log(`Algo. File Sync Started at: ${new Date().toISOString()}`)
  
      const algoMap = await readFromCSV()
      await readCodeFiles(algoMap)
      await readMarkdownFiles(algoMap)
      const algosArray = convertMapToArray(algoMap)
  
      await Algorithm.deleteMany({})
      await Algorithm.insertMany(algosArray, {ordered: false})
  
      await convert_customIds_to_DBIds_in_linkedAlgos()
  
      console.log(`Algo. File Sync Completed at: ${new Date().toISOString()}`)
      const endTime = Date.now()
      console.log(`Time Taken to Sync Algo. Files = ${endTime - startTime} ms`)

      resolve()
  
    }catch(err){
      console.log(err)
      reject()
    }
  })
}

module.exports = syncAlgos