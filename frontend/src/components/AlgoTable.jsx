import React, { useState } from 'react'

import classes from './css/AlgoTable.module.css'
import baseUrl from '../config/baseUrl'

function AlgoTable({ algoObjs, setShowList, setIsError, setCodeObj }) {

  const items = algoObjs.map((algoObj) => algoObj)

  const [sortOrder, setSortOrder] = useState('a-z')
  const [filterText, setFilterText] = useState('ShowAllItems')

  // comparator for sorting
  function cmp(a, b, order){
    if(order === 'z-a')
      return a.title < b.title
    else if(order === 'difficulty_LowToHigh')
      return a.difficulty === b.difficulty ? a.title > b.title : a.difficulty > b.difficulty
    else if(order === 'difficulty_HighToLow')
      return a.difficulty === b.difficulty ? a.title > b.title : a.difficulty < b.difficulty

    // default: order === 'a-z'
    return a.title > b.title
  }

  function searchTextHandler(e){
    if(e.target.value === ''){
      setFilterText('ShowAllItems')
    }else {
      setFilterText(e.target.value)
    }
  }

  function numberToColor(val){
    if(val === 1) 
      return '#00cc7a' // light-green
    else if(val === 2)
      return '#006600' // dark-green
    else if(val === 3)
      return '#e6e600' // yellow
    else if(val === 4)
      return '#ff6600' // orange

    return '#ff3300' // red
  }

  async function algoRequestClickHandler(e) {
    try{
      const algoId = e.target.parentElement.id

      const response = await fetch(`${baseUrl}/algos?algo_id=${algoId}`)
      const data = await response.json()

      setCodeObj((codeObj) => ({
        ...codeObj,
        id: data.id,
        title: data.title,
        language: data.language,
        description: data.description,
        code: data.code
      }))

      setIsError(false)
      setShowList(false)
    }catch(err){
      console.error(err)
      setIsError(true)
      setShowList(true)

      setTimeout(() => setIsError(false), 3000);
    }
  }

  const itemsToDisplay = items
  .filter((item) => filterText === 'ShowAllItems' || item.title.search(new RegExp(filterText, 'i')) !== -1)
  .sort((a, b) => cmp(a, b, sortOrder))
  .map((item, index) => 
    <tr key = {item.id} id={item.id} onClick={algoRequestClickHandler} > 
      <td>{(index + 1) + '. '}</td>
      <td>{item.title} </td>
      <td style={{color: numberToColor(item.difficulty), fontSize: '29px'}}>
        {'* '.repeat(item.difficulty)}
      </td>
    </tr>
  )

  return (<>
    <div className={classes.filterAndSortContainer}>
      {/* Filter input */}
      <div className={classes.filterContainer}>
        <label htmlFor="SearchInput">Search: </label>
        <input type="text" id="SearchInput" name="SearchInput" 
        onChange={searchTextHandler} placeholder=' Search for any algorithm...' />
      </div>

      {/* Sort-by dropdown */}
      <div className={classes.sortContainer}>
        <label htmlFor="sortListSelector">Sort by:</label>
        <select name="sortListSelector" id="sortListSelector" 
        onClick={(e) => setSortOrder(e.target.value)}>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="difficulty_LowToHigh">Difficulty (Low to High)</option>
          <option value="difficulty_HighToLow">Difficulty (High to Low)</option>
        </select>
      </div>

    </div>

    {/* Algorithm List */}
    <div className={classes.algoTableConatinerWrapper}>
    <div className={classes.algoTableConatiner}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Difficulty</th>
          </tr>
        </thead>
      </table>
      <tbody>
        {itemsToDisplay}
      </tbody>
    </div>
    </div>

    <hr/>
  </>)
}

export default AlgoTable