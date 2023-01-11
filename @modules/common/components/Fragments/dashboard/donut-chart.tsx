import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Fragment } from 'react';
import { Pie } from 'react-chartjs-2';
import distinctColors from 'distinct-colors'


ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC<any> = ({ outgoingsSum }) => {

  const colors = outgoingsSum.map((item: any) => {

    return distinctColors({ count: 30 })
  })

  const data = {
    labels: outgoingsSum.map((item: any) => {
      return item.tag
    }),
    datasets: [
      {
        label: 'Amount:',
        data: outgoingsSum.map((item: any) => {
          return item.totalCost
        }),
        backgroundColor: [
          'rgba(234, 199, 199, 1)',
          'rgba(160, 195, 210, 1)',
          'rgba(247, 245, 235, 1)',
          'rgba(158, 161, 212, 1)',
          'rgba(134, 200, 188)',
          'rgba(102, 101, 124, 1)',
          'rgba(183, 211, 223, 1)',
          'rgba(154, 134, 164, 1)',
          'rgba(140, 192, 222, 1)',
        ],
        borderColor: '#fff' 
        },
    ],
  };

   return (
    <Fragment>
      {outgoingsSum && <Pie data={data} />}
         </Fragment>
  )
}


export default DonutChart;
