import { Bar } from "react-chartjs-2";
// Chart import is Required (DO NOT REMOVE)
import Chart from 'chart.js/auto';

function BarChart({ statDataObj }) {
  const quesIds = statDataObj.acceptedQuesIds

  // may be increased in the future
  const LeetcodeTotalProblems = 
    process.env.REACT_APP_LEETCODE_TOTAL_PROBLEMS
    ? Math.max(parseInt(process.env.REACT_APP_LEETCODE_TOTAL_PROBLEMS), statDataObj.maxQuesId)
    : statDataObj.maxQuesId

  const groups = Math.ceil(LeetcodeTotalProblems / 100)

  const xAxisValues = Array.from({ length: groups }, (_, i) => `${(i*100 + 1).toString()} - ${((i+1)*100).toString()}`)
  const yAxisValues = Array.from({ length: groups }, () => 0)

  for(const quesId of quesIds){
    yAxisValues[Math.floor((quesId - 1)/100)]++
  }

  const data = {
    labels: xAxisValues,
    datasets: [{
      label: 'Questions solved',
      data: yAxisValues,
      borderWidth: 1,
    }],
  };

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Question Number (in increments of 100)',
          color: 'black',
          font: {
            size: 22,
            lineHeight: 1.2,
          },
          padding: {top: 0, left: 0, right: 10, bottom: 0}
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Questions solved',
          color: 'black',
          font: {
            size: 22,
            lineHeight: 1.2
          },
          padding: {top: 10, left: 0, right: 0, bottom: 0}
        },
        type: 'linear',
        min: 0,
        max: 100,
      }
    },

    plugins: {
      title: {
        display: true,
        text: 'Distribution of Leetcode Questions solved',
        color: 'black',
        padding: {top: 0, left: 0, right: 0, bottom: 10},
        font: {
          size: 26
        }
      },
      legend: {
        display: false,
      }
    },

    elements: {
      bar: {
        borderWidth: 1,
        borderColor: '#476b6b',
        backgroundColor: function(context) {
          const index = context.dataIndex;
          const value = context.dataset.data[index];
  
          if(value >= 80) 
            return '#aa00ff' // violet
          else if(value >= 60)
            return '#0099ff' // blue
          else if(value >= 50)
            return '#00ff99' // green; ('#00e6ac': sea-green)
          else if(value >= 40)
            return '#ffff4d' // yellow
          else if(value >= 30)
            return '#ff9933' // orange
          return '#ff4d4d' // red
        }
      }
    }
  }

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    aligItems: 'center',
    width: 'auto', 
    height: '670px', 
    padding: '10px 0px', 
    margin: '20px 4%',
    border: '5px solid #444444',
    borderRadius: '5px', 
    backgroundColor: "#f1f1f1",
    overflow: 'scroll'
  }

  return (<>
    <div style={styles} >
      <Bar data={data} options={options}/>
    </div>
  </>)
}

export default BarChart
