import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as Chartjs} from 'chart.js/auto'

function Chart({ spendings }) {
  const currentDate = new Date();
  const labels = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    labels.push(date.toISOString().slice(0, 10));
  }

  const pastSixDaysSpendings = spendings.filter((spending) => {
    const spendingDate = new Date(spending.date);
    return spendingDate >= new Date(labels[0]) && spendingDate <= currentDate;
  });

  const data = labels.map((label) => {
    const spendingForDay = pastSixDaysSpendings.find((spending) => spending.date === label);
    return spendingForDay ? spendingForDay.amount : 0;
  });

  return (
    <div  className='h-80 border-red border-x-2 border-y-2 w-1/2'>
      Chart:
      <Bar
        data={{
          labels: labels,
          datasets: [{
            label: 'Amount',
            data: data,
            backgroundColor: 'rgba(255, 192, 203, 1)',
            borderRadius: 5,
            borderColor: 'rgba(219, 112, 147, 1)',
            borderWidth: 2,
          }],
        }}
        options={{
          scales: {
            y: {
              type: 'linear', // Specify scale type as 'linear'
              beginAtZero: true,
              ticks: {
                stepSize: 100.00
              }
            }
          }
        }}
      />
    </div>
  );
}

export default Chart;
