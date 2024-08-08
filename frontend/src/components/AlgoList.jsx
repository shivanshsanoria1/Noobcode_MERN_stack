import React, { useEffect, useState } from 'react'

import AlgoListItem from './AlgoListItem'
import AlgoCodeDisplayBox from './AlgoCodeDisplayBox'
import AlgoControlBar from './AlgoControlBar'
import baseUrl from '../config/baseUrl'
import Error from './Error'

import classes from './css/AlgoList.module.css'

function AlgoList() {
	const [algoObjs, setAlgoObjs] = useState([])
  const [showList, setShowList] = useState(true)
  const [codeObj, setCodeObj] = useState({})
	const [isError, setIsError] = useState(false)

  const startTheme = JSON.parse(localStorage.getItem('theme_local'))
  const [theme, setTheme] = useState(startTheme ? startTheme : 'okaidia')

	async function fetchAlgorithms() {
		try{
			const response = await fetch(`${baseUrl}/algos/get-all-algos`)
			const data = await response.json()
			
			setAlgoObjs([...algoObjs, ...data])

			setIsError(false)
			setShowList(false)
			setShowList(true)

		}catch(err){
			console.error(err)
			setIsError(true)
			setShowList(false)
		}
	}

	useEffect(() => {
		fetchAlgorithms()
	}, [])

  useEffect(() => {
    console.log(theme)
    localStorage.setItem('theme_local', JSON.stringify(theme))
  }, [theme])

  // let sortOrder = 'A-Z'
  // function cmp(a, b){
  //   if(sortOrder ===  'Z-A')
  //     return a.title < b.title
    
  //   // sortOrder === 'A-Z'
  //   return a.title > b.title
  // }

  return (<>
		{ isError ? <Error /> : (<></>) }

		{showList ? <ul className={classes.algoList}> {
      algoObjs
      .sort((a, b) => a.title > b.title)
      .map((algoObj) => <AlgoListItem 
        key={algoObj.id} 
        item={algoObj} 
        setShowList={setShowList}
        setCodeObj={setCodeObj}
      />)
    } </ul> : <>
      <div className={classes.algoControlBarConatiner}>
        <AlgoControlBar 
          setShowList={setShowList} 
          codeObj={codeObj} 
          setCodeObj={setCodeObj} 
          theme={theme}
          setTheme={setTheme}
        />
      </div>
      <AlgoCodeDisplayBox 
        setShowList={setShowList} 
        codeObj={codeObj} 
        setCodeObj={setCodeObj} 
        theme={theme}
      />
    </>}
	</>)
}

export default AlgoList