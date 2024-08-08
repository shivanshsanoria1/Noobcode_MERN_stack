import React from 'react'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cpp } from 'react-syntax-highlighter/dist/esm/languages/prism'
import { a11yDark, atomDark, coldarkDark, dracula, gruvboxDark, hopscotch, lucario, materialDark, 
  materialOceanic, nightOwl, nord, okaidia, oneDark, solarizedDarkAtom, tomorrow, twilight, zTouch } 
from 'react-syntax-highlighter/dist/esm/styles/prism';

import classes from './css/AlgoCodeDisplayBox.module.css'

function AlgoCodeDisplayBox({setShowList, codeObj, setCodeObj, theme}) {
  SyntaxHighlighter.registerLanguage('cpp', cpp)

  const themeName = theme
  let themeValue = okaidia // default theme value

  if(themeName){
    const themes = [
      {name: 'a11yDark', value: a11yDark},
      {name: 'atomDark', value: atomDark}, 
      {name: 'coldarkDark', value: coldarkDark},
      {name: 'dracula', value: dracula}, 
      {name: 'gruvboxDark', value: gruvboxDark}, 
      {name: 'hopscotch', value: hopscotch}, 
      {name: 'lucario', value: lucario}, 
      {name: 'materialDark', value: materialDark}, 
      {name: 'materialOceanic', value: materialOceanic},
      {name: 'nightOwl', value: nightOwl}, 
      {name: 'nord', value: nord },
      {name: 'okaidia', value: okaidia}, 
      {name: 'oneDark', value: oneDark},
      {name: 'solarizedDarkAtom', value: solarizedDarkAtom},
      {name: 'tomorrow', value: tomorrow},
      {name: 'twilight', value: twilight},
      {name: 'zTouch', value: zTouch},
    ]
    
    themeValue = themes.filter((theme) => theme.name === themeName)[0].value
  }

  const {title, code} = codeObj

  return (<div className={classes.masterContainer}>

    <div className={classes.titleContainer}>
      <h1 className={classes.titleHead}>{title}</h1>
    </div>

    <SyntaxHighlighter 
      language={'cpp'}
      style={themeValue} 
      showLineNumbers={true} 
      wrapLines={true}
      className={classes.codeContainer}>
        {code}
    </SyntaxHighlighter>
  </div>)
}

export default AlgoCodeDisplayBox