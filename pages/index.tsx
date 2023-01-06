import { CurrentUserContext } from '@modules/common/hooks/current-user-context';
import getCurrentUserFunction from '@modules/common/hooks/get-current-user';
import { color } from '@modules/common/types/types-interfaces';
import { Fragment, useContext, useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';

export default function Home({ currentUser }: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true)
 
  useEffect(() => {
    console.log(currentUser)
    setIsLoading(false);
  }, [])


  return (
    <Fragment>
      {isLoading && <div className='h-full w-full flex justify-center items-center'> <CircleLoader size={100} color={color.blue} /> </div>}
      {!isLoading && <h1 className='font-extrabold text-lg '>Home</h1>}
    </Fragment>
  );
}

Home.getInitialProps = async (context: any, client: any, currentUser: any) => {
   console.log(context)
   return currentUser;
};
