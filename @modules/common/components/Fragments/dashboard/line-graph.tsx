import React, { Fragment, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import getDatesInRange from '@modules/common/utils/get-dates-in-range';
import { format } from 'date-fns';
import { Filler } from 'chart.js/dist';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart: React.FC<any> = ({
  expenses,
  startDate,
  endDate,
  dailySpend,
}) => {
  const [dates, setDates] = useState<any[]>([]);

  const matchDates = (dates: Date[], dailySpend: string) => {
    const finalDates = dates.map((date) => {
      if (
        expenses.filter((item: any) => {
          return (
            new Date(item.dateSpent).setHours(0, 0, 0, 0).toString() ===
            date.setHours(0, 0, 0, 0).toString()
          );
        }).length > 0
      ) {
        const additionalCost = expenses
          .filter((item: any) => {
            return (
              new Date(item.dateSpent).setHours(0, 0, 0, 0).toString() ===
              date.setHours(0, 0, 0, 0).toString()
            );
          })
          .reduce((a: any, b: any) => {
            return a + b.cost;
          }, 0);
        return { date, value: additionalCost + +dailySpend };
      }
      return { date, value: +dailySpend };
    });
    setDates(finalDates);
  };

  useEffect(() => {
    //console.log(expenses, startDate, endDate);
    const dates = getDatesInRange(new Date(startDate), new Date(endDate));
    setDates(dates);
    matchDates(dates, dailySpend);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };
  const data = {
    labels: dates.map((item) => {
      return format(new Date(item.date), 'dd/MM');
    }),
    datasets: [
      {
        label: 'Daily Spending',
        data: dates.map((item) => {
          return item.value;
        }),
        borderColor: 'rgb(96,165,250)',
        backgroundColor: 'rgba(96,165,250, 0.2)',
        tension: 0.15,
      },
    ],
  };

  return <Fragment>{dates && <Line options={options} data={data} />}</Fragment>;
};

export default DashboardChart;
