import { useEffect, useState } from 'react'
import classes from './css/SolutionCards.module.css'
import SolutionCard from "./SolutionCard"

function SolutionsCard({ solutionsObj, setIsFound }) {
  const startTheme = JSON.parse(localStorage.getItem('theme_local'))
  
  const [theme, setTheme] = useState(startTheme ? startTheme : 'okaidia')
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

  const themes = [
    {name: 'okaidia', displayName: 'Okaidia'},
    {name: 'hopscotch', displayName: 'Hopscotch'},
    {name: 'atomDark', displayName: 'Atom Dark'},
    {name: 'dracula', displayName: 'Dracula'}, 
    {name: 'materialDark', displayName: 'Matrial Dark'}, 
    {name: 'materialOceanic', displayName: 'Material Oceanic'},
    {name: 'nord', displayName: 'Nord' },
    {name: 'coldarkDark', displayName: 'Coldark Dark'},
    {name: 'oneDark', displayName: 'One Dark'},
    {name: 'a11yDark', displayName: 'A11y Dark'}
  ]

  return (<> 
    <label>
      Select a Theme
      <select name='selectedTheme' defaultValue={startTheme} onChange={(e) => setTheme(e.target.value)}>
        {
          themes.map((theme) => <option value={theme.name} key={theme.name}>{theme.displayName}</option>)
        }
      </select>
    </label>  

    <button className={classes.closeBtn} onClick={() => setIsFound(false)}> X </button>

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

export default SolutionsCard


{/* <input type='text' value={theme} disabled />
<button onClick={() => setTheme('okaidia')}>Okaidia</button>
<button onClick={() => setTheme('hopscotch')}>hopscotch</button>
<button onClick={() => setTheme('atomDark')}>atomDark</button>
<button onClick={() => setTheme('dracula')}>dracula</button>
<button onClick={() => setTheme('materialDark')}>materialDark</button>
<button onClick={() => setTheme('materialOceanic')}>materialOceanic</button>
<button onClick={() => setTheme('nord')}>nord</button>
<button onClick={() => setTheme('coldarkDark')}>coldarkDark</button>
<button onClick={() => setTheme('oneDark')}>oneDark</button>
<button onClick={() => setTheme('a11yDark')}>a11yDark</button> */}

{/* <button onClick={() => setTheme('okaidia')}>Okaidia</button>
<button onClick={() => setTheme('tomorrow')}>Tomorrow</button>
<button onClick={() => setTheme('twilight')}>Twilight</button>
<button onClick={() => setTheme('coy')}>Coy</button>
<button onClick={() => setTheme('dark')}>Dark</button>
<button onClick={() => setTheme('solarizedlight')}>Solarized Light</button>
<button onClick={() => setTheme('')}>Default</button> */}