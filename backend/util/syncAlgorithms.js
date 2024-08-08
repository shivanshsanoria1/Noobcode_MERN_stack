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