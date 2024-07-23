import { useEffect, useState } from 'react'
import classes from './css/SolutionCards.module.css'
import SolutionCard from "./SolutionCard"

function SolutionCards({ solutionsObj, theme }) {
  const [loadSolutions, setLoadSolutions] = useState(true)

  const { quesId, title, acceptedSolutions, unacceptedSolutions, language } = solutionsObj
  
  const formattedTitle = title.split(' ').map((word) => {
    const firstChar = word[0]
    const isUppercase = firstChar === firstChar.toUpperCase()
    return isUppercase ? word : word[0].toUpperCase() + word.substring(1)
  }).join(' ')

  let solutionNum = 0

  useEffect(() => {
    setLoadSolutions(false)
    localStorage.setItem('theme_local', JSON.stringify(theme))
    setTimeout(() => {
      setLoadSolutions(true)
    }, 100);
  }, [theme])

  return (<>
    <div className={classes.titleContainer}>
      <h1 className={classes.titleHead}>{quesId}{'. '}{formattedTitle}</h1>
    </div>

    { loadSolutions ? <>
      {
        unacceptedSolutions.map((solution) => {
          return <SolutionCard 
          solution={solution} 
          language={language}
          isAccepted={false} 
          solutionNum={++solutionNum}
          key={Math.floor(Math.random()*1000000)} 
          />
        })
      }
      {
        acceptedSolutions.map((solution) => {
          return <SolutionCard 
          solution={solution}
          language={language} 
          isAccepted={true}
          solutionNum={++solutionNum}
          key={Math.floor(Math.random()*1000000)} 
          />
        })
      }
    </> : (<></>) }
  </>)
}

export default SolutionCards