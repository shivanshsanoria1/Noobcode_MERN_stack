import React from 'react'

import classes from './css/AlgoListItem.module.css'

function AlgoListItem({item, setShowList, setCodeObj}) {
  const {id, title, code} = item

  console.log(item)

  function handleClick(){
    console.log('li clicked')

    setCodeObj((codeObj) => ({
      ...codeObj,
      id,
      title,
      code
    }))

    setTimeout(() => setShowList(false), 100);
  }

  return (<li className={classes.algoListItem} id={id} onClick={handleClick}>
    {title}
  </li>)
}

export default AlgoListItem