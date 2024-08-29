const path = require('path')
const { readdir, readFile } = require('node:fs/promises')

const Algorithm = require('../models/algorithm')

function readFromCSV() {
  return new Promise(async (resolve, reject) => {
    try {
      const csvFilePath = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'helper', 'metadata', 'algorithms_metadata.csv')
      const csv_data = await readFile(csvFilePath, { encoding: 'utf8' });

      const data = csv_data.split('\n').map((row) => 
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
        
        algoMap.set(fileNameWithoutExt, {
          customId,
          difficulty
        })
      }

      resolve(algoMap)
        
    } catch(err) {
      console.log('ERROR: readFromCSV() in Algos.')
      console.log(err);
      reject()
    }
  })
}

function readCodeFiles(algoMap){
  return new Promise(async (resolve, reject) => {
    try{
      const algosDirPath = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'helper')

      const fileNames = await readdir(algosDirPath)

      for(const fileName of fileNames){
        // skip the directories
        if(fileName === 'markdown' || fileName === 'metadata'){
          continue
        }

        const algoFilePath = path.join(algosDirPath, fileName)
        
        const fileNameWithoutExt = fileName.split('.')[0]

        const title = fileName.split('.')[0].split('_').join(' ')
        const language = path.extname(algoFilePath).substring(1)
        const fileData = await readFile(algoFilePath, { encoding: 'utf8' })

        if(!algoMap.has(fileNameWithoutExt)){
          throw new Error(`File << ${fileName} >> not found in .csv file`)
        }
        
        const algoObj = algoMap.get(fileNameWithoutExt)
        algoMap.set(fileNameWithoutExt, {
          ...algoObj,
          title,
          language,
          code: fileData
        })
      }

      resolve()

    }catch(err){
      console.log('ERROR: readFiles() in Algos.')
      console.log(err)
      reject()
    }
  })
}

function readMarkdownFiles(algoMap) {
  return new Promise(async(resolve, reject) => {
    try{
      const markdownDirPath = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'helper', 'markdown')

      const fileNames = await readdir(markdownDirPath)

      for(const fileName of fileNames){
        const markdownFilePath = path.join(markdownDirPath, fileName)
        
        const fileNameWithoutExt = fileName.split('.')[0]

        const fileData = await readFile(markdownFilePath, { encoding: 'utf8' })

        if(!algoMap.has(fileNameWithoutExt)){
          throw new Error(`File << ${fileName} >> not found in .csv file`)
        }
        
        const algoObj = algoMap.get(fileNameWithoutExt)
        algoMap.set(fileNameWithoutExt, {
          ...algoObj,
          description: fileData
        })
      }

      resolve()

    }catch(err){
      console.log('ERROR: readMarkdownFiles() in Algos.')
      console.log(err)
      reject()
    }
  })
}

function convertMapToArray(mp){
  const arr = []
  for(const obj of mp.values()){
    arr.push(obj)
  }

  return arr
}

function readFromDB(){
  return new Promise(async (resolve, reject) => {
    try{
      const algos = await Algorithm.find({})
      
      const customId_to_DBId_map = new Map()

      for(let algo of algos){
        const {customId, _id, title} = algo
        customId_to_DBId_map.set(customId, {
          _id: _id.toString(),
          title
        })
      }

      resolve(customId_to_DBId_map)

    }catch(err){
      console.log('ERROR: readFromDB() in algos.')
      console.log(err)
      reject()
    }
  })
}

function readFromCSVAfterDB() {
  return new Promise(async (resolve, reject) => {
    try {
      const csvFilePath = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'helper', 'metadata', 'algorithms_metadata.csv')
      const csv_data = await readFile(csvFilePath, { encoding: 'utf8' });

      const data = csv_data.split('\n').map((row) => 
        row
        .replaceAll(/,_/g, ';_')
        .replaceAll(/"/g, '')
        .replace('\r', '')
        .split(',')
      )
      // remove the last empty row
      data.pop()

      const customId_to_linkedCustomIds_map = new Map()

      for(let i=1; i<data.length; i++){
        const customId = data[i][0]
        const prerequisiteId = data[i][3]
        const similarId = data[i][4]
        const followupId = data[i][5]

        customId_to_linkedCustomIds_map.set(customId, {
          prerequisiteId,
          similarId,
          followupId
        })
      }

      resolve(customId_to_linkedCustomIds_map)
        
    } catch(err) {
      console.log('ERROR: readFromCSVAfterDB() in Algos.')
      console.log(err);
      reject()
    }
  })
}

function convertCustomIdsToDBIds(customId_to_linkedCustomIds_map, customId_to_DBId_map){
  const DBId_to_linkedDBIds_map = new Map()

  for(const [customId, linkedIds] of customId_to_linkedCustomIds_map){
    const {prerequisiteId, similarId, followupId} = linkedIds

    const customDBId = customId_to_DBId_map.get(customId)._id

    const prerequisiteAlgo = prerequisiteId.length > 0 ? customId_to_DBId_map.get(prerequisiteId) : {_id: '', title: ''}
    const similarAlgo = similarId.length > 0 ? customId_to_DBId_map.get(similarId) : {_id: '', title: ''}
    const followupAlgo = followupId.length > 0 ? customId_to_DBId_map.get(followupId) : {_id: '', title: ''}

    DBId_to_linkedDBIds_map.set(customDBId, {
      prerequisiteAlgo,
      similarAlgo,
      followupAlgo
    })
  }

  return DBId_to_linkedDBIds_map
}

function writeLinkedIdsToDB(DBId_to_linkedDBIds_map){
  return new Promise(async(resolve, reject) => {
    try{
      for(const [customDBId, linkedDBIds] of DBId_to_linkedDBIds_map){
        const {prerequisiteAlgo, similarAlgo, followupAlgo} = linkedDBIds
        
        const algoObj = await Algorithm.findById({_id: customDBId})

        if(prerequisiteAlgo._id.length > 0){
          algoObj.linkedAlgos.prerequisiteAlgo.id = prerequisiteAlgo._id 
          algoObj.linkedAlgos.prerequisiteAlgo.title = prerequisiteAlgo.title
        }
        if(similarAlgo._id.length > 0){
          algoObj.linkedAlgos.similarAlgo.id = similarAlgo._id 
          algoObj.linkedAlgos.similarAlgo.title = similarAlgo.title
        }
        if(followupAlgo._id.length > 0){
          algoObj.linkedAlgos.followupAlgo.id = followupAlgo._id 
          algoObj.linkedAlgos.followupAlgo.title = followupAlgo.title
        }

        await algoObj.save()
      }

      resolve()

    }catch(err){
      console.log('ERROR: writeLinkedIdsToDB() in algos.')
      console.log(err)
      reject()
    }
  })
}

async function syncAlgos(){
  try{
    const startTime = Date.now()
    console.log(`Algo. File Sync Started at: ${new Date().toISOString()}`)

    const algoMap = await readFromCSV()
    await readCodeFiles(algoMap)
    await readMarkdownFiles(algoMap)
    const algosArray = convertMapToArray(algoMap)
    
    await Algorithm.deleteMany({})
    await Algorithm.insertMany(algosArray, {ordered: false})

    const customId_to_DBId_map = await readFromDB()
    const customId_to_linkedCustomIds_map = await readFromCSVAfterDB()
    const DBId_to_linkedDBIds_map = convertCustomIdsToDBIds(customId_to_linkedCustomIds_map, customId_to_DBId_map)
    await writeLinkedIdsToDB(DBId_to_linkedDBIds_map)

    console.log(`Algo. File Sync Completed at: ${new Date().toISOString()}`)
    const endTime = Date.now()
    console.log(`Time Taken to Sync Algo. Files = ${endTime - startTime} ms`)

  }catch(err){
    console.log('ERROR: syncAlgos() in Algos.')
    console.log(err)
  }
}

module.exports = syncAlgos