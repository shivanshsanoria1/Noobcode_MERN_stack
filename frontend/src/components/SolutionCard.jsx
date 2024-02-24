import React, { useEffect } from "react";
import Prism from "prismjs";

// THEME
import "prismjs/themes/prism-okaidia.css";
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
    Prism.highlightAll()
  }, [])

  return (
    <div className={classes.solutionContainer}>
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