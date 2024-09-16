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
      const response = await fetch(`${baseUrl}/solutions/stats`)
      const data = await response.json()
      
      setIsError(false)
      setSolutionStatsObj(data)

      sessionStorage.setItem('solutionStatsObj_local', JSON.stringify(data))
    }catch(err){
      setIsError(true)

      console.error(err)
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem('solutionStatsObj_local')) {
      setIsError(false)
      setSolutionStatsObj(JSON.parse(sessionStorage.getItem('solutionStatsObj_local')))
    } else {
      getSolutionStats()
    }
  }, [])

  return (<>
    { isError ? <Error /> : (<></>) }

    <div className={classes.statBoxContainer}>
      {
        Object.keys(solutionStatsObj).length > 0 ? (
          <>
            <SolutionStatBox language='CPP' solvedCount={solutionStatsObj.solvedCountCPP} />
            <SolutionStatBox language='JS'solvedCount={solutionStatsObj.solvedCountJS} />
            <SolutionStatBox language='SQL' solvedCount={solutionStatsObj.solvedCountSQL} />
          </>
        ) : (<></>)
      }
    </div>
  </>)
}

export default SolutionStatBoxes