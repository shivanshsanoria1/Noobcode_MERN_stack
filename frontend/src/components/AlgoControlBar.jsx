import React, { useState } from 'react'

import ThemeSelector from './ThemeSelector'

import classes from './css/AlgoControlBar.module.css'

function AlgoControlBar({ setShowList, codeObj, setCodeObj, theme, setTheme }) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyToClipboardHandler(){
    console.log('copy btn clicked')

    // during deployment this will not work over http connection
    // as it requires https connection or localhost
    await navigator.clipboard.writeText(codeObj.code)

    setIsCopied(true)

    setTimeout(() => setIsCopied(false), 3000);
  }

  function closeClickHandler(){
    console.log('close btn clicked')
    setCodeObj({})
    setShowList(true)
  }

  return (<>
    <div className={classes.controlBarContainer}>
      <div className={classes.themeSelectorContainer}> 
        <ThemeSelector theme={theme} setTheme={setTheme} />
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
            Close
          </button>
        </span>
      </div>
      
    </div>
  </>)
}

export default AlgoControlBar