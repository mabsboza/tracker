import React, { useEffect, useState } from 'react';
import { fetchDaily } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDaily());
    }
    fetchAPI();
  }, []);

  const lineChart = (
    dailyData.length
    ?
      (<Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infectados',
            borderColor: '#FFC500',
            fill: true
          }, {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Muertes',
            borderColor: '#9B0808',
            backgroundColor: '#D18686',
            fill: true
          }]
        }}
        />) : null
  )

  const barChart = (
    confirmed
    ?
    <Bar data = {
      {
        labels: ['Infectados', 'Recuperados', 'Muertos'],
        datasets: [{
          labels: 'Personas',
          backgroundColor: ['rgb(255, 143, 0)', 'rgb(59, 217, 0)', 'rgb(212, 0, 0)'],
          data: [confirmed.value, recovered.value, deaths.value]
        }]
      }}
      options ={
        {
          legend: { display: false },
          title: { display: true, text: `País actual ${country}`}
        }}
    />
    :
    null
  )

  return (
   <div className={styles.container}>
    {country ? barChart : lineChart }
   </div>
  )
}

export default Chart;