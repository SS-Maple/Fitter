import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useAuth } from '../user-auth.js';



const LineChart = () => {
  const [date, setDate] = useState([])
  const [calorie, setCalorie] = useState([])
  const [water, setWater] = useState([])
  const [weight, setWeight] = useState([])
  const [display, setDisplay] = useState([])
  const [text, setText] = useState('Calorie')

  const auth = useAuth();

  function getStatData(userid){
    return axios.get('/userdata', { params: {userId: userid}})
    .then(results => {
      results.data[0].stats.forEach(day => {
        setDate(prevState => prevState.concat(day.date))
        setCalorie(prevState => prevState.concat(day.calories))
        setWater(prevState => prevState.concat(day.water))
        setWeight(prevState => prevState.concat(day.weight))
      })
    })
  }

  useEffect(() => {
    getStatData(auth.userId)
  }, [])

  useEffect(() => {
    setDisplay(calorie)
  }, [calorie])

  function handleChange(e){
    setText(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
    if (e.target.value === 'water'){
      setDisplay(water)
    }
    if (e.target.value === 'weight'){
      setDisplay(weight)
    }
    if (e.target.value === 'calories'){
      setDisplay(calorie)
    }
  }

  let data = {
    labels: date,
    datasets: [
      {
        label: text,
        data: display,
        fill: false,
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      }
    ],
  };

  let options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
    <div className='header'>
      <h1 className='title'>{text} Chart</h1>
      <form>
        <label htmlFor='chart-selection'> Select Chart </label>
      <select name='charts' id='chart-selection' onChange={(e) => handleChange(e)}>
        <option value='calories'>Calories</option>
        <option value='water'>Water</option>
        <option value='weight'>Weight</option>
      </select>
      </form>
      <div className='links'></div>
    </div>
    <Line data={data} options={options} />
  </>
    )

}

export default LineChart;