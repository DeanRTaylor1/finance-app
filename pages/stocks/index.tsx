import { Fragment, useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';
import Input from '@modules/common/components/Form/Input';
import Router from 'next/router';
import SquareContainer from '@modules/common/components/Fragments/Square-Container';
import PageContainer from '@modules/common/components/Fragments/Page-Container';
import GetData from '@modules/common/components/Charts/ChartData';
import StockContainer from '@modules/common/components/Fragments/Stock-Container';
import { color } from '@modules/common/types/types-interfaces';
import { saveToLocal } from '@modules/common/utils/save-to-local';

export default function Stocks({ currentUser }: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [stocks, setStocks] = useState<any[] | null>(null);

  const [stockCode, setStockCode] = useState('');
  const [months, setMonths] = useState(0);

  const getStockCode = (e: React.FormEvent<HTMLInputElement>) => {
    setStockCode(e.currentTarget.value);
  };

  const getMonths = (e: React.FormEvent<HTMLInputElement>) => {
    setMonths(+e.currentTarget.value);
  };

  // [
  //   { code: 'VOO', months: 18 },
  //   { code: 'VWRL.AS', months: 12 },
  // ]

  useEffect(() => {

    if (!currentUser) {
      Router.push('/auth/signin');
    }
    let localStocks: any = localStorage.getItem('stocks')
    setStocks(JSON.parse(localStocks))

    console.log(JSON.parse(localStocks))
    setIsLoading(false);
  }, []);

  const setInitialStocks = (stockCode:string, months:string) => {
          setStockCode(stockCode) 
          setMonths
      }


  const addStockHandler = () => {
    console.log(JSON.stringify(stocks))
    console.log({ code: stockCode, months })
    if (!stocks) {
      setStocks([{ code: stockCode, months }]);
      setStockCode('');
      setMonths(0);
      window.localStorage.setItem('stocks', JSON.stringify([{ code: stockCode, months }]))
      return;
    }
    //only storing one stock to limit API calls
    const temp = [...stocks, { code: stockCode, months }];
    setStocks(temp);
    setStockCode('');
    setMonths(0);
   

  };

  const deleteStockHandler = (stock: string) => {
    if (stocks!.length === 1) {
      setStocks(null);
    }
    const temp = stocks!.filter((stockObject) => {
      return stockObject.code !== stock;
    });
    setStocks(temp);
    window.localStorage.setItem('stocks',
      JSON.stringify(temp))
  };

  if (isLoading) {
    return (
      <Fragment>
        <PageContainer>
          {isLoading && (
            <div className='h-full w-full flex justify-center items-center'>
              <CircleLoader size={100} color={color.blue} />
            </div>
          )}
        </PageContainer>
      </Fragment>

    )
  } else {
    return (
      <Fragment>
        <PageContainer>
          {stocks &&
            stocks.map((stock, index) => {
              return (
                <StockContainer
                  key={index}
                  code={stock.code}
                  deleteHandler={deleteStockHandler}
                >
                  <GetData stock={stock.code} months={stock.months} />
                </StockContainer>
              );
            })}

          {!isLoading && (!stocks || stocks.length < 5) && (
            <SquareContainer>
              <Input
                name={'Stock Code:'}
                label={'stockcode'}
                type={'text'}
                placeholder={'Stock Code'}
                getInputs={getStockCode}
                value={stockCode}
              />
              <Input
                name={'Months'}
                label={'months'}
                type={'text'}
                placeholder={'Months of data'}
                getInputs={getMonths}
                value={months.toString()}
              />
              <button className='signInButton' onClick={addStockHandler}>
                Add Chart
              </button>
            </SquareContainer>
          )}
        </PageContainer>
      </Fragment>
    );
  }
}

Stocks.getInitialProps = async (
  context: any,
  client: any,
  currentUser: any
) => {
  return currentUser;
};
