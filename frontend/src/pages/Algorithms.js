import React, { useEffect, useState } from 'react'

import baseUrl from '../config/baseUrl'
import Error from '../components/Error'
import AlgoTable from '../components/AlgoTable'
import AlgoDisplay from '../components/AlgoDisplay'

function Algorithms() {
  const [showList, setShowList] = useState(true)
  const [isError, setIsError] = useState(false)
  const [algoObjs, setAlgoObjs] = useState([])
  const [codeObj, setCodeObj] = useState({})

  async function fetchAlgorithms() {
		try{
      let data = []

      if(sessionStorage.getItem('algoObjs_local')){
        data = JSON.parse(sessionStorage.getItem('algoObjs_local'))
      }else{
        const response = await fetch(`${baseUrl}/algos/get-all-algos`)
        data = await response.json()

        sessionStorage.setItem('algoObjs_local', JSON.stringify(data))
      }

			setAlgoObjs([...algoObjs, ...data])
      
      setIsError(false)
			setShowList(false)
			setShowList(true)
		}catch(err){
			console.error(err)
			setIsError(true)
			setShowList(true)
		}
	}

  useEffect(() => {
		fetchAlgorithms()
	}, [])

  return (<>
    { isError ? <Error /> : (<></>) }

    {showList ? 
      <AlgoTable 
      algoObjs={algoObjs} 
      setShowList={setShowList}
      setIsError={setIsError}
      setCodeObj={setCodeObj}
    /> : <>
      <AlgoDisplay 
        setShowList={setShowList} 
        codeObj={codeObj} 
        setCodeObj={setCodeObj} 
      />
    </>}

  </>)
}

export default Algorithms