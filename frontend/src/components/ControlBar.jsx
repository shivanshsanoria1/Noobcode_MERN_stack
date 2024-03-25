import React, { useEffect, useState } from 'react'
//import ThemeSelector from './ThemeSelector'
import classes from './css/ControlBar.module.css'
import closeBtnLogo from '../logos/close_btn_logo.svg'
import prevBtnLogo from '../logos/prev_btn_logo.svg'
import nextBtnLogo from '../logos/next_btn_logo.svg'

function ControlBar({ setIsFound, controlIndex, setControlIndex, setLoadSolutionCards, setSolutionsObj }) {
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(true)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)

  useEffect(() => {
    if(!sessionStorage.getItem('visitedQuesIds')) {
      console.error('visitedQuesIds not found in sessionStorage')
      return
    }

    const visitedQuesIdsSize = JSON.parse(sessionStorage.getItem('visitedQuesIds')).length
    
    setPrevBtnEnabled(controlIndex <= 0 ? false : true)

    setNextBtnEnabled(controlIndex >= visitedQuesIdsSize - 1 ? false : true)
  }, [controlIndex])

  function prevClickHandler() {
    if(!sessionStorage.getItem('visitedQuesIds')) {
      console.error('visitedQuesIds not found in sessionStorage')
      return
    }
    
    if(controlIndex <= 0){
      return
    }

    const prevIndex = controlIndex - 1

    setControlIndex(prevIndex)

    setLoadSolutionCards(false)

    setTimeout(() => {
      const visitedQuesIds = JSON.parse(sessionStorage.getItem('visitedQuesIds'))
      const quesId = visitedQuesIds[prevIndex]
      const data = JSON.parse(sessionStorage.getItem(quesId.toString()))

      setSolutionsObj({ quesId: parseInt(quesId), ...data})

      setLoadSolutionCards(true)
      
    }, 100);
  }

  function nextClickHandler() {
    if(!sessionStorage.getItem('visitedQuesIds')) {
      console.error('visitedQuesIds not found in sessionStorage')
      return
    }
    
    const visitedQuesIds = JSON.parse(sessionStorage.getItem('visitedQuesIds'))

    if(controlIndex >= visitedQuesIds.length - 1) {
      return
    }

    const nextIndex = controlIndex + 1

    setControlIndex(nextIndex)

    setLoadSolutionCards(false)

    setTimeout(() => {
      const visitedQuesIds = JSON.parse(sessionStorage.getItem('visitedQuesIds'))
      const quesId = visitedQuesIds[nextIndex]
      const data = JSON.parse(sessionStorage.getItem(quesId.toString()))

      setSolutionsObj({ quesId: parseInt(quesId), ...data})

      setLoadSolutionCards(true)
    }, 100);
  }

  function closeClickHandler() {
    setIsFound(false)
  }

  return (<div className={classes.controlBarContainer}>
    <div className={classes.themeSelectorContainer}>

    </div>

    <div className={classes.navBtnsContainer}> 
      <button 
      onClick={prevClickHandler} 
      disabled={!prevBtnEnabled} 
      className={classes.prevBtn}> 
        <img src={prevBtnLogo} alt='Prev' className={classes.logo}></img> 
      </button>

      <button 
      onClick={nextClickHandler} 
      disabled={!nextBtnEnabled} 
      className={classes.nextBtn}>
        <img src={nextBtnLogo} alt='Next' className={classes.logo}></img> 
      </button>
    </div>

    <div className={classes.closeBtnContainer}>
      <button 
      onClick={closeClickHandler} 
      className={classes.closeBtn}> 
        <img src={closeBtnLogo} alt='Close' className={classes.logo}></img>
      </button>
    </div>

  </div>)
}

export default ControlBar