import { Pie } from "react-chartjs-2";
// Chart import is Required (DO NOT REMOVE)
import Chart from 'chart.js/auto';


function PieChart({ title, statDataObj, chartType }) {
  // may be increased in the future
  const LeetcodeTotalProblems = process.env.REACT_APP_LEETCODE_TOTAL_PROBLEMS || 3060

  const {
    solvedCountCPP, 
    solvedCountJS, 
    solvedCountSQL, 
    partialSolvedCountCPP
  } = statDataObj

  const labels = []
  const solvedCounts = []
  const bgColors = []
  let label = 'Problems solved'

  if(chartType === 'language'){
    labels.push('C++')
    labels.push('Javascript')
    labels.push('MySQL')

    solvedCounts.push(solvedCountCPP)
    solvedCounts.push(solvedCountJS)
    solvedCounts.push(solvedCountSQL)

    bgColors.push('#33adff') // blue
    bgColors.push('#ffe066') // yellow
    bgColors.push('#00ff99') // green
  }else if(chartType === 'total') {
    labels.push('Solved')
    labels.push('Partially Solved')
    labels.push('Unsolved')

    const totalSolved = solvedCountCPP + solvedCountJS + solvedCountSQL
    const totalPartialSolved = partialSolvedCountCPP
    const totalUnsolved = LeetcodeTotalProblems - totalSolved - totalPartialSolved

    solvedCounts.push(totalSolved)
    solvedCounts.push(totalPartialSolved)
    solvedCounts.push(totalUnsolved)

    bgColors.push('#00ff99') // green
    bgColors.push('#ffe066') // yellow
    bgColors.push('#ff4d4d') // red

    label = 'Problem Count'
  }
  
  const data = {
    labels: labels,
    datasets: [{
      label: label,
      data: solvedCounts,
      backgroundColor: bgColors
    }]
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
        color: 'white',
        padding: 0,
        font: {
          size: 22
        }
      },
      legend: {
        display: true,
        labels: {
          color: 'white',
          padding: 25,
          font: {
            size: 16
          }
        }
      }
    }
  }

  // for some reason external styling does not work here
  // so internal styling is used instead
  const chartStyles = {
    display: 'flex',
    justifyContent: 'center',
    aligItems: 'center',
    width: '600px', 
    height: '500px', 
    padding: '10px'
  }

  return (<>
    <div style={chartStyles}>
      <Pie data={data} options={options}/>
    </div>
  </>)
}

export default PieChart