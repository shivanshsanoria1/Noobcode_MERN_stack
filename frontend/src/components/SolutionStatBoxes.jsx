import { useState, useEffect } from 'react'

import classes from './css/SolutionStatBoxes.module.css'
import SolutionStatBox from './SolutionStatBox'
import Error from './Error'
import baseUrl from '../config/baseUrl'

function SolutionStatBoxes() {
  const [solutionStatsObj, setSolutionStatsObj] = useState({});
  const [isError, setIsError] = useState(false)

  async function getSolutionStats(){
    try{
      const response = await fetch(`${baseUrl}/solution-stats`)
      const data = await response.json()
      
      setIsError(false)

      setSolutionStatsObj((prevState) => {
        const newState = { ...prevState, ...data }
        sessionStorage.setItem('solutionStatsObj_local', JSON.stringify(newState))
        return newState
      })
      
    }catch(err){
      //alert('Something went wrong :(')
      setIsError(true)
      console.log(err)
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem('solutionStatsObj_local')){
      setIsError(false)
      setSolutionStatsObj(JSON.parse(sessionStorage.getItem('solutionStatsObj_local')))
    }else{
      getSolutionStats()
    }
  }, [])

  return (<>
    { isError ? <Error /> : (<></>) }

    <div className={classes.statBoxContainer}>
      {
        Object.keys(solutionStatsObj).length > 0 ? (
          <>
            <SolutionStatBox language='CPP' solvedCount={solutionStatsObj.countCPP} />
            <SolutionStatBox language='JS'solvedCount={solutionStatsObj.countJS} />
            <SolutionStatBox language='SQL' solvedCount={solutionStatsObj.countSQL} />
          </>
        ) : ( <></> )
      }
    </div>
  </>)
}

export default SolutionStatBoxes