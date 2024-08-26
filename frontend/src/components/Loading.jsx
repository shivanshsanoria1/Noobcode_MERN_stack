import React from 'react'

import classes from './css/Loading.module.css'

function Loading() {
  return (<>
    <h1 className={classes.loadingText}> Loading... </h1>
    <h2 className={classes.loadingText}> Please Wait ! </h2>
  </>)
}

export default Loading