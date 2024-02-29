
import { useState } from 'react';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cpp, javascript, sql } from 'react-syntax-highlighter/dist/esm/languages/prism'
import { okaidia, hopscotch, atomDark, dracula, materialDark, materialOceanic, 
  nord, coldarkDark, oneDark, a11yDark } 
  from 'react-syntax-highlighter/dist/esm/styles/prism';

import { CopyToClipboard } from "react-copy-to-clipboard"

import copyLogo from '../logos/copy_logo.svg'
import classes from './css/SolutionCard.module.css'

function SolutionCard({ solution, language, isAccepted, solutionNum }) {
  const [isCopied, setIsCopied] = useState(false)

  const languageHighlight = language === 'js' ? 'javascript' : language

  if(language === 'cpp'){
    SyntaxHighlighter.registerLanguage('cpp', cpp)
  } else if(language === 'js') {
    SyntaxHighlighter.registerLanguage('javascript', javascript)
  } else if(language === 'sql') {
    SyntaxHighlighter.registerLanguage('sql', sql)
  }
  
  const themeName = JSON.parse(localStorage.getItem('theme_local'))
  let themeValue = okaidia // default theme value

  if(themeName){
    const themes = [
      {name: 'okaidia', value: okaidia}, 
      {name: 'hopscotch', value: hopscotch}, 
      {name: 'atomDark', value: atomDark}, 
      {name: 'dracula', value: dracula}, 
      {name: 'materialDark', value: materialDark}, 
      {name: 'materialOceanic', value: materialOceanic},
      {name: 'nord', value: nord },
      {name: 'coldarkDark', value: coldarkDark},
      {name: 'oneDark', value: oneDark},
      {name: 'a11yDark', value: a11yDark}
    ]
    
    themeValue = themes.filter((theme) => theme.name === themeName)[0].value
  }

  return (
    <div className={isAccepted ? classes.acceptedSolutionContainer : classes.unacceptedSolutionContainer}>
      <div>
        <h2 className={isAccepted ? classes.methodContainerAccepted : classes.methodContainerNotAccepted}>
          Method [{solutionNum}] ({isAccepted ? 'Accepted' : 'Not Accepted'})
          <CopyToClipboard text={solution}>
            <button className={classes.copyBtn}
            onClick={() => {
              setIsCopied(true)
              setTimeout(() => {
                setIsCopied(false)
              }, 3000);
            }}>
              {
                isCopied
                ? <span>Copied...</span>
                : <span title='Copy'>
                    <img src={copyLogo} alt='Copy' className={classes.copyLogo} />
                  </span>
              }
            </button>
          </CopyToClipboard>
        </h2>
      </div>

      <SyntaxHighlighter 
      language={languageHighlight}
      style={themeValue} 
      showLineNumbers={true} 
      wrapLines={true}
      className={classes.codeContainer}>
        {solution}
      </SyntaxHighlighter>
    </div>
  )
}

export default SolutionCard












/*

import React, { useEffect } from "react";

import Prism from "prismjs";

// THEME
//import "prismjs/themes/prism-okaidia.css"
// LANGUAGE SUPPORT
import "prismjs/components/prism-c"
  // cpp-language Requires c-language component
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-sql"
// PLUGINS
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/toolbar/prism-toolbar"
import "prismjs/plugins/toolbar/prism-toolbar.css"
  // 'copy-to-clipboard' plugin Requires 'toolbar' plugin
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard"

import classes from './css/SolutionCard.module.css'

function SolutionCard({ solution, language, isAccepted, solutionNum }) {

  useEffect(() => {

    (async function loadTheme() {
      // THEME
      const theme = JSON.parse(localStorage.getItem('theme_local'))
      console.log(theme)

      // assume 'okaidia' as the default theme
      if(!theme) {
        await import (`prismjs/themes/prism-okaidia.css`)
      }
      else if(theme === '') {
        await import (`prismjs/themes/prism.css`)
      } else {
        await import (`prismjs/themes/prism-${theme}.css`)
      }

      Prism.highlightAll()
    })()
    //loadTheme()
  }, [])

  return (
    <div className={isAccepted ? classes.acceptedSolutionContainer : classes.unacceptedSolutionContainer}>
      <div>
        <h2 className={isAccepted ? classes.methodContainerAccepted : classes.methodContainerNotAccepted}>
          Method [{solutionNum}] ({isAccepted ? 'Accepted' : 'Not Accepted'})
        </h2>
      </div>
      <pre className={`line-numbers ${classes.codeContainer}`}>
        <code className={`language-${language}`} data-prismjs-copy="Copy">
          {solution}
        </code>
      </pre>
    </div>
  )
}

export default SolutionCard

*/