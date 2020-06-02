import React, {useEffect, useState } from 'react';
import { fetchDaily } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDaily());
    }
    fetchAPI();
  });

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

  return (
   <div className={styles.container}>
    {lineChart}
   </div>
  )
}

export default Chart;