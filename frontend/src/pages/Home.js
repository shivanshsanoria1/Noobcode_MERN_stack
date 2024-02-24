import { useState } from "react"

import SearchBar from "../components/SearchBar"
import SolutionStatBoxes from "../components/SolutionStatBoxes"
import SolutionCards from '../components/SolutionCards'
import classes from './css/Home.module.css'
import Error from "../components/Error"

function HomePage() {
  const [isFound, setIsFound] = useState(false)
  const [solutionsObj, setSolutionsObj] = useState({})
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (<>
    <SearchBar 
    setIsFound={setIsFound} 
    setSolutionsObj={setSolutionsObj} 
    setIsError={setIsError} 
    setErrorMessage={setErrorMessage}
    />

    { isError ? <Error message={errorMessage} /> : (<></>) }

    { 
      isFound === false ? (<>
        <div className={classes.msgBox}>
          <h2>
            Welcome! Search for over <i>1000 solutions</i>  from leetcode.com
          </h2>
        </div>
        <SolutionStatBoxes />
      </>) : 
      <SolutionCards solutionsObj={solutionsObj} /> 
    }

  </>)
}

export default HomePage