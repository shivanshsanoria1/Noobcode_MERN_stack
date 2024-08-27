import React, { useEffect, useState }  from 'react'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cpp } from 'react-syntax-highlighter/dist/esm/languages/prism'
import { a11yDark, atomDark, coldarkDark, dracula, gruvboxDark, hopscotch, lucario, materialDark, 
  materialOceanic, nightOwl, nord, okaidia, oneDark, solarizedDarkAtom, tomorrow, twilight, zTouch } 
from 'react-syntax-highlighter/dist/esm/styles/prism';

import closeBtnLogo from '../logos/close_btn_logo.svg'
import MarkdownDisplayer from './MarkdownDisplayer';

import classes from './css/AlgoDisplay.module.css'

function AlgoDisplay({setShowList, codeObj, setIsLoading }) {
  function convertThemeNameToValue(themeName){
    const themeNameToValues = [
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
    
    return themeNameToValues.filter(({name}) => name === themeName)[0].value
  }

  const themeName_local = localStorage.getItem('themeNameAlgo_local') ? 
  JSON.parse(localStorage.getItem('themeNameAlgo_local')) : 'okaidia'

  SyntaxHighlighter.registerLanguage('cpp', cpp)

  const [isCopied, setIsCopied] = useState(false)
  const [themeValue, setThemeValue] = useState(convertThemeNameToValue(themeName_local))

  const {title, language, description, code} = codeObj

  let languageToDisplay = language
  if(language === 'cpp'){
    languageToDisplay = 'C++'
  }

  async function copyToClipboardHandler(){
    console.log('copy btn clicked')

    if(!navigator || !navigator.clipboard){
      console.error('Navigator or Clipboard not found')
      return
    }

    // during deployment this will not work over http connection
    // as it requires https connection or localhost
    await navigator.clipboard.writeText(codeObj.code)

    setIsCopied(true)

    setTimeout(() => setIsCopied(false), 3000);
  }

  function closeClickHandler(){
    //setCodeObj({})
    setShowList(true)
  }

  function changeThemeClickHandler(e){
    const clickedThemeName = e.target.value
    localStorage.setItem('themeNameAlgo_local', JSON.stringify(clickedThemeName))

    setIsLoading(true)

    setTimeout(() => setIsLoading(false), 200);
  }

  const themeNameToDisplayNames = [
    {name: 'a11yDark', displayName: 'A11y Dark'},
    {name: 'atomDark', displayName: 'Atom Dark'}, 
    {name: 'coldarkDark', displayName: 'Coldark Dark'},
    {name: 'dracula', displayName: 'Dracula'}, 
    {name: 'gruvboxDark', displayName: 'Gruvbox Dark'}, 
    {name: 'hopscotch', displayName: 'Hopscotch'}, 
    {name: 'lucario', displayName: 'Lucario'}, 
    {name: 'materialDark', displayName: 'Material Dark'}, 
    {name: 'materialOceanic', displayName: 'Material Oceanic'},
    {name: 'nightOwl', displayName: 'Night Owl'}, 
    {name: 'nord', displayName: 'Nord' },
    {name: 'okaidia', displayName: 'Okaidia'}, 
    {name: 'oneDark', displayName: 'One Dark'},
    {name: 'solarizedDarkAtom', displayName: 'Solarized Dark Atom'},
    {name: 'tomorrow', displayName: 'Tomorrow'},
    {name: 'twilight', displayName: 'Twilight'},
    {name: 'zTouch', displayName: 'Z Touch'}
  ]

  return (<>
    <div className={classes.algoContainer}>
      <div className={classes.descriptionContainer}>
        <div className={classes.titleContainer}>
          {title}
        </div>

        <MarkdownDisplayer textMd={description} />
      </div>

      <div className={classes.codeAndControlContainer}>
        <div className={classes.controlBarContainer}>
          <div className={classes.themeSelectContainer}>
            <select 
            id='selectTheme'
            name='selectTheme' 
            defaultValue={themeName_local} 
            onChange={changeThemeClickHandler}
            >
              {
                themeNameToDisplayNames.map(({name, displayName}) => 
                  <option value={name} key={name}>
                    {displayName}
                  </option>
                )
              }
            </select>
          </div>

          <div className={classes.languageContainer}>
            {`Language: ${languageToDisplay}`}
          </div>

          <div className={classes.copyBtnContainer}> 
            <button className={classes.copyBtn}
              disabled={isCopied}
              onClick={copyToClipboardHandler}>
                {
                  isCopied
                  ? <span>Copied...</span>
                  : <span>Copy</span>
                }
            </button>
          </div>

          <div className={classes.closeBtnContainer}>
            <span title='Close'>
              <button 
              onClick={closeClickHandler} 
              className={classes.closeBtn}>
                <img src={closeBtnLogo} alt='Close' className={classes.logo} />
              </button>
            </span>
          </div>
        </div>

        <div className={classes.codeContainer}>
          <SyntaxHighlighter 
            language={'cpp'}
            style={themeValue} 
            showLineNumbers={true} 
            wrapLines={true}
            className={classes.codeContainer}>
              {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  </>)
}

export default AlgoDisplay