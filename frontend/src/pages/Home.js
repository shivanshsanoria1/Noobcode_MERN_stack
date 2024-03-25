import { useEffect, useState } from "react"

import SearchBar from "../components/SearchBar"
import SolutionStatBoxes from "../components/SolutionStatBoxes"
import SolutionCards from '../components/SolutionCards'
import classes from './css/Home.module.css'
import Error from "../components/Error"
import ControlBar from "../components/ControlBar"

function HomePage() {
  const [isFound, setIsFound] = useState(false)
  const [solutionsObj, setSolutionsObj] = useState({})
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadSolutionCards, setLoadSolutionCards] = useState(true)
  const [controlIndex, setControlIndex] = useState(-1)

  useEffect(() => {
    if(!sessionStorage.getItem('visitedQuesIds')) {
      return
    }

    const index = JSON.parse(sessionStorage.getItem('visitedQuesIds')).length - 1
    console.log('home ' + index)
    setControlIndex(index)
  }, [])

  return (<>
    <SearchBar 
    setIsFound={setIsFound} 
    setSolutionsObj={setSolutionsObj} 
    setIsError={setIsError} 
    setErrorMessage={setErrorMessage}
    setControlIndex={setControlIndex}
    controlIndex={controlIndex}
    />

    { isError ? <Error message={errorMessage} /> : (<></>) }

    { 
      isFound === false ? (<>
        <div className={classes.msgBox}>
          <h2>
            Welcome! Search for over <i>1000 solutions</i>  from 
            <a href='https://leetcode.com/problemset/' target='_blank'>leetcode.com</a>
          </h2>
        </div>
        <SolutionStatBoxes />
      </>) : (<div className={classes.solutionsWrapper}>
        <ControlBar 
        setIsFound={setIsFound} 
        controlIndex={controlIndex} 
        setControlIndex={setControlIndex}
        setLoadSolutionCards={setLoadSolutionCards}
        setSolutionsObj={setSolutionsObj}
        />
        {
          loadSolutionCards
          ? (
            <SolutionCards 
            solutionsObj={solutionsObj} 
            setIsFound={setIsFound} 
            />)
          : (<></>)
        }
      </div>)
    }

  </>)
}

export default HomePage