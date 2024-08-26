import React, { useState }  from 'react'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cpp } from 'react-syntax-highlighter/dist/esm/languages/prism'
import { a11yDark, atomDark, coldarkDark, dracula, gruvboxDark, hopscotch, lucario, materialDark, 
  materialOceanic, nightOwl, nord, okaidia, oneDark, solarizedDarkAtom, tomorrow, twilight, zTouch } 
from 'react-syntax-highlighter/dist/esm/styles/prism';

import closeBtnLogo from '../logos/close_btn_logo.svg'
import MarkdownDisplayer from './MarkdownDisplayer';

import classes from './css/AlgoDisplay.module.css'

function AlgoDisplay({setShowList, codeObj, setIsLoading }) {
  SyntaxHighlighter.registerLanguage('cpp', cpp)

  const [isCopied, setIsCopied] = useState(false)

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

  const {title, language, description, code} = codeObj

  let languageToDisplay = language
  if(language === 'cpp'){
    languageToDisplay = 'C++'
  }

  function changeClickHandler(){
    console.log('meeeeeeeeeeeee')
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 100);
  }

  return (<>
    <button onClick={changeClickHandler}>change me</button>

    <div className={classes.algoContainer}>
      <div className={classes.descriptionContainer}>
        <div className={classes.titleContainer}>
          {title}
        </div>

        <MarkdownDisplayer textMd={description} />
      </div>

      <div className={classes.codeAndControlContainer}>
        <div className={classes.controlBarContainer}>
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
            style={okaidia} 
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