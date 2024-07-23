import { useState } from 'react';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cpp, javascript, sql } from 'react-syntax-highlighter/dist/esm/languages/prism'
import { a11yDark, atomDark, coldarkDark, dracula, gruvboxDark, hopscotch, lucario, materialDark, 
  materialOceanic, nightOwl, nord, okaidia, oneDark, solarizedDarkAtom, tomorrow, twilight, zTouch } 
  from 'react-syntax-highlighter/dist/esm/styles/prism';

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

  async function copyToClipboardHandler(){
    // during deployment this will not work over http connection
    // as it requires https connection or localhost
    await navigator.clipboard.writeText(solution)

    setIsCopied(true)

    setTimeout(() => setIsCopied(false), 3000);
  }

  return (
    <div className={isAccepted ? classes.acceptedSolutionContainer : classes.unacceptedSolutionContainer}>
      <div>
        <h2 className={isAccepted ? classes.methodContainerAccepted : classes.methodContainerNotAccepted}>
        Method [{solutionNum}] ({isAccepted ? 'Accepted' : 'Not Accepted'})
          <button className={classes.copyBtn}
          disabled={isCopied}
          onClick={copyToClipboardHandler}>
            {
              isCopied
              ? <span>Copied...</span>
              : <span title='Copy'>
                  <img src={copyLogo} alt='Copy' className={classes.copyLogo} />
                </span>
            }
          </button>
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



// --------------- Older Version using PrismJS --------------- //
// (cannot change Theme dynamically)

/*

import Prism from "prismjs";

// THEME
import "prismjs/themes/prism-okaidia.css"
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