import { useState } from 'react';

import classes from './css/SearchBar.module.css'
import baseUrl from '../config/baseUrl';

function SearchBar({ setIsFound, setSolutionsObj, setIsError, setErrorMessage, setControlIndex }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [disableInput, setDisableInput] = useState(false)

  function addVisitedQuesIdLocally(quesId) {
    if(!sessionStorage.getItem('visitedQuesIds')) {
      const visitedQuesIds = [quesId]
      sessionStorage.setItem('visitedQuesIds', JSON.stringify(visitedQuesIds))

      setControlIndex(visitedQuesIds.length - 1)
    } else {
      const visitedQuesIds = JSON.parse(sessionStorage.getItem('visitedQuesIds'))
      visitedQuesIds.push(quesId)
      sessionStorage.setItem('visitedQuesIds', JSON.stringify(visitedQuesIds))

      setControlIndex(visitedQuesIds.length - 1)
    }
  }

  function updateVisitedQuesIdLocally(quesId) {
    if(!sessionStorage.getItem('visitedQuesIds')) {
      console.error('visitedQuesIds not found in sessionStorage')
      return
    }
    
    const visitedQuesIds = JSON.parse(sessionStorage.getItem('visitedQuesIds'))
    const index = visitedQuesIds.indexOf(quesId)

    if(index === -1) {
      console.error(`quesId = ${quesId} not found in visitedQuesIds in sessionStorage`)
      return
    }

    setControlIndex(-1)

    for(let i=index; i < visitedQuesIds.length - 1; i++) {
      [visitedQuesIds[i], visitedQuesIds[i+1]] = [visitedQuesIds[i+1], visitedQuesIds[i]]
    }
    sessionStorage.setItem('visitedQuesIds', JSON.stringify(visitedQuesIds))

    setTimeout(() => {
      setControlIndex(visitedQuesIds.length - 1)
    }, 50);
  }

  function removeError(time = 4000){
    setTimeout(() => {
      setIsError(false)
      setErrorMessage('')
      setDisableInput(false)
    }, time)
  }

  async function getSolution(quesId) {
    try{
      // no input entered
      if(quesId === '') {
        setIsError(true)
        setErrorMessage('Please enter a question number !')
        setIsFound(false)
        setSolutionsObj({})
        setSearchTerm('')
        setDisableInput(true)

        removeError()

        return
      }

      // verify ques id is a integer
      if(isNaN(parseInt(quesId))) {
        setIsError(true)
        setErrorMessage('Invalid question number !')
        setIsFound(false)
        setSolutionsObj({})
        setSearchTerm('')
        setDisableInput(true)

        removeError()

        return
      }
      
      // retrive data from session-storage
      if(sessionStorage.getItem(quesId.toString())){
        const data = JSON.parse(sessionStorage.getItem(quesId.toString()))

        setIsError(false)
        setErrorMessage('')
        setIsFound(true)
        setSolutionsObj({ quesId: parseInt(quesId), ...data})
        setSearchTerm('')

        updateVisitedQuesIdLocally(parseInt(quesId))

        return
      }

      // fetch data from backend
      const response = await fetch(`${baseUrl}/solutions?ques_id=${quesId}`)
      const data = await response.json()

      // solution not found
      if(data.found === false){
        setIsError(true)
        setErrorMessage('Solution not found :(')
        setIsFound(false)
        setSolutionsObj({})
        setSearchTerm('')
        setDisableInput(true)
        
        removeError()

        return
      }

      // solution found
      setIsError(false)
      setErrorMessage('')
      setIsFound(true)
      setSolutionsObj({
        quesId: parseInt(data.quesId),
        title: data.title,
        language: data.language,
        acceptedSolutions: data.acceptedSolutions,
        unacceptedSolutions: data.unacceptedSolutions
      })
      setSearchTerm('')

      sessionStorage.setItem(data.quesId.toString(), JSON.stringify({
        title: data.title,
        language: data.language,
        acceptedSolutions: data.acceptedSolutions,
        unacceptedSolutions: data.unacceptedSolutions
      }))

      addVisitedQuesIdLocally(parseInt(data.quesId))

    }catch(err){
      console.error(err)
      setIsError(true)
      setErrorMessage('Something went wrong :(')
      removeError()
    }
  }

  return (<>
    <div className={classes.searchBarContainer}>
      <input 
      placeholder='Enter Leetcode Question Number'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' ? getSolution(searchTerm) : null}
      disabled={disableInput}
      />
      <button 
      onClick={() => getSolution(searchTerm)}
      disabled={disableInput}
      >
        Search
      </button>
    </div>
  </>)
}

export default SearchBar