import { useState, useEffect } from 'react'
import PieChart from '../components/PieChart'
import BarChart from '../components/BarChart'
import Error from '../components/Error'
import baseUrl from '../config/baseUrl'

function Statistics() {
  const [statDataObj, setStatDataObj] = useState({})
  const [isError, setIsError] = useState(false)

  async function getSolutionStats() {
    try{
      if(sessionStorage.getItem('solutionStatsObj_local')){
        setIsError(false)
        setStatDataObj(JSON.parse(sessionStorage.getItem('solutionStatsObj_local')))
        return
      }

      const response = await fetch(`${baseUrl}/solution-stats`)
      const data = await response.json()

      setIsError(false)

      setStatDataObj(data)

      sessionStorage.setItem('solutionStatsObj_local', JSON.stringify(data))
    }catch(err){
      console.error(err)
      setIsError(true)
    }
  }
  
  useEffect(() => {
    getSolutionStats()
  }, [])

  // for some reason external styling does not work here
  // so internal styling is used instead
  const pieChartsStyles = {
    display: 'flex',
    justifyContent: 'center',
    aligItems: 'center',
    margin: '10px 0px',
  }

  return (<>
    { isError ? <Error /> : <></>}

    {
      Object.keys(statDataObj).length > 0 ? (<>
        <div style={pieChartsStyles}>
          <PieChart 
          title={'Total number of problems solved'} 
          statDataObj={statDataObj} 
          chartType={'total'} 
          />
          <PieChart 
          title={'Problems solved per language'} 
          statDataObj={statDataObj} 
          chartType={'language'} 
          />
        </div>
        <BarChart statDataObj={statDataObj} />
      </>) : (<> </>)
    }
  </>)
}

export default Statistics