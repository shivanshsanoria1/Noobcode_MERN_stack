import classes from './css/SolutionCards.module.css'
import SolutionCard from "./SolutionCard"

function SolutionsCard(props) {
  const { quesId, title, acceptedSolutions, unacceptedSolutions, language } = props.solutionsObj
  //const id = props.solutionsObj._id
  const formattedTitle = title.split(' ').map((word) => {
    const firstChar = word[0]
    const isUppercase = firstChar === firstChar.toUpperCase()
    return isUppercase ? word : word[0].toUpperCase() + word.substring(1)
  }).join(' ')

  let solutionNum = 0

  return (
    <>
      <div className={classes.titleContainer}>
      <h1 className={classes.titleHead}>{quesId}{'. '}{formattedTitle}</h1>
      </div>
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
    </>
  )
}

export default SolutionsCard