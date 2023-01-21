import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

//chart

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
import LineChart from './Line-Chart';
import LoadingCircle from '../loadingbar/loading-circle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartData({ stock, months }: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [details, setDetails] = useState<any>(null);
  const [finalDates, setFinalDates] = useState<any>(null);
  const [finalStockData, setfinalStockData] = useState<any>(null);

  const getData = async (code: string) => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${code}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.data;
      const stockDetails = data['Meta Data'];
      const stockData: any = data['Monthly Time Series'];
      const dates = Object.keys(stockData).reverse();
      setFinalDates(dates);
      setDetails(stockDetails);
      setfinalStockData(stockData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(stock);
  }, []);

  useEffect(() => {
    //console.log(details, finalDates, finalStockData);
  }, [details, finalDates, finalStockData]);

  return (
    <Fragment>
      {isLoading && (
        <div className='h-full w-full flex justify-center items-center'>
          <LoadingCircle />
        </div>
      )}
      {!isLoading && (
        <LineChart
          stockDetails={details}
          stockData={finalStockData}
          dates={finalDates}
          months={months}
        />
      )}
    </Fragment>
  );
}
