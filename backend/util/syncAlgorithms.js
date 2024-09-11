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
        const prerequisiteId = data[i][3]
        const similarId = data[i][4]
        const followupId = data[i][5]
        
        algoMap.set(customId, {
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

        const customId = fileName.substring(fileName.indexOf('[') + 1, fileName.indexOf(']'))
        const language = path.extname(algoFilePath).substring(1)

        const fileData = await readFile(algoFilePath, { encoding: 'utf8' })

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
      console.log('ERROR: readCodeFiles() in Algos.')
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
        
        const customId = fileName.substring(fileName.indexOf('[') + 1, fileName.indexOf(']'))

        const fileData = await readFile(markdownFilePath, { encoding: 'utf8' })

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
      console.log('ERROR: readMarkdownFiles() in Algos.')
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

function linkedAlgos_stat_update(){
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
      console.log('ERROR: linkedAlgos_stat_update() in syncAlgos()')
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

    await linkedAlgos_stat_update()

    console.log(`Algo. File Sync Completed at: ${new Date().toISOString()}`)
    const endTime = Date.now()
    console.log(`Time Taken to Sync Algo. Files = ${endTime - startTime} ms`)

  }catch(err){
    console.log('ERROR: syncAlgos() in Algos.')
    console.log(err)
  }
}

module.exports = syncAlgos