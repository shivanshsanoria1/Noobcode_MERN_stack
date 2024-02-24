import classes from './css/SolutionStatBox.module.css'

function SolutionStatBox({ language, solvedCount = 0 }) {
  let bgColor = '#000000'
  if(language === 'CPP'){
    bgColor = '#008ae6' // blue
    language = 'C++'
  }else if(language === 'JS'){
    bgColor = '	#f4ca25' // yellow
    language = 'Javascript'
  }if(language === 'SQL'){
    bgColor = '#00b36b' // green
    language = 'MySQL'
  }
  
  return (
    <div className={classes.box} style={{ backgroundColor: bgColor }}>
      <div className={classes.boxItem}><b>{solvedCount}</b> Problems</div>
      <div className={classes.boxItem}>solved in <b>{language}</b></div>
    </div>
  )
}

export default SolutionStatBox