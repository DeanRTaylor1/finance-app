import LoadingCircle from '@modules/common/components/loadingbar/loading-circle';
import getCurrentUserFunction from '@modules/common/hooks/get-current-user';
import { color } from '@modules/common/types/types-interfaces';
import Image from 'next/image';
import { Fragment, useContext, useEffect, useState } from 'react';

export default function Home({ currentUser }: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  useEffect(() => {
    console.log(currentUser)
    setIsLoading(false);
  }, [])


  return (
    <Fragment>
      {isLoading && <div className='h-full w-full flex justify-center items-center'> <LoadingCircle /> </div>}

      {!isLoading &&
        <div className='  w-[100vw] h-fit min-h-[calc(90vh)] flex flex-col items-start justify-start z-10'>
          <div className='w-[100%] bg-white h-fit relative p-10 flex flex-col  justify-start items-center gap-4'>
            <div className='flex flex-col justify-center items-center md:flex-row'>
              <div className='flex flex-col gap-2 justify-center items-center p-4'>
                <h1 className='w-full font-bold text-2xl '>Keep an eye on things.</h1>
                <h3 className='w-fit '>Making recording your finances easier with MyFin.</h3>
              </div>
              <div>
                <Image alt='Image by <a href="https://www.freepik.com/free-vector/modern-set-colorful-planning-elements_3199899.htm#query=hand%20drawn%20calculator&position=5&from_view=keyword">Freepik</a>' src={'/home-image.png'} width={450} height={450} />
              </div>
            </div>
            {!currentUser && <button className='navButton w-full max-w-[800px]'>Sign up now!</button>}
          </div>
          <div className='h-96 w-full flex gap-8 z-50 items-center justify-center'>
            <div>Image</div>
            <div>Text</div>
          </div>

        </div>
      }
    </Fragment>
  );
}

Home.getInitialProps = async (context: any, client: any, currentUser: any) => {

  return currentUser;
}; 
