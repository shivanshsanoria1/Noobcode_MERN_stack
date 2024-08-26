const path = require('path')
const { readdir, readFile } = require('node:fs/promises')

const Algorithm = require('../models/algorithm')

function readFromCSV() {
  return new Promise(async (resolve, reject) => {
    try {
      const csvFilePath = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'helper', 'metadata', 'metadata.csv')
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
        const fileNameWithoutExt = data[i][1].replaceAll(/;/g, ',')
        const difficulty = parseInt(data[i][2])
        
        algoMap.set(fileNameWithoutExt, {
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

async function syncAlgos(){
  try{
    const startTime = Date.now()
    console.log(`Algo. File Sync Started at: ${new Date().toISOString()}`)

    const algoMap = await readFromCSV()

    await readCodeFiles(algoMap)
    await readMarkdownFiles(algoMap)

    const algosArray = convertMapToArray(algoMap)
    //console.log(algosArray)
    
    await Algorithm.deleteMany({})
    await Algorithm.insertMany(algosArray, {ordered: false})

    console.log(`Algo. File Sync Completed at: ${new Date().toISOString()}`)
    const endTime = Date.now()
    console.log(`Time Taken to Sync Algo. Files = ${endTime - startTime} ms`)

  }catch(err){
    console.log('ERROR: syncAlgos() in Algos.')
    console.log(err)
  }
}

module.exports = syncAlgos





/*

const path = require('path')
const fs = require('fs')
const { readdir, readFile } = require('node:fs/promises')

const Algorithm = require('../models/algorithm')

function readAllFiles(){
  return new Promise(async (resolve, reject) => {
    try{
      const algosDirPath = path.join(__dirname, '..', '..', 'LeetcodeSolutions', 'helper')

      const fileNames = await readdir(algosDirPath)
      const algosArray = []

      for(const fileName of fileNames){
        const algoFilePath = path.join(algosDirPath, fileName)
        
        const title = fileName.split('.')[0].split('_').join(' ')
        const language = path.extname(algoFilePath).substring(1)
        const fileData = await readFile(algoFilePath, 'utf8')

        algosArray.push({
          title,
          language,
          code: fileData
        })
      }

      resolve(algosArray)
    }catch(err){
      console.log('ERROR: readAllFiles() in Algos.')
      console.log(err)
      reject()
    }
  })
}

async function syncAlgos() {
  try{
    const startTime = Date.now()
    console.log(`Algo. File Sync Started at: ${new Date().toISOString()}`)

    const algosArray = await readAllFiles()
    
    await Algorithm.deleteMany({})
    await Algorithm.insertMany(algosArray, {ordered: false})

    console.log(`Algo. File Sync Completed at: ${new Date().toISOString()}`)
    const endTime = Date.now()
    console.log(`Time Taken to Sync Algo. Files = ${endTime - startTime} ms`)

  }catch(err){
    console.log('ERROR: syncAllAlgos()')
    console.log(err)
  }
}

module.exports = syncAlgos

*/