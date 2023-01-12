import React, {
  Fragment,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CustomPropsWithChildren } from '@modules/common/types/types-interfaces';
import Navbar from '../Fragments/Navbar';
import { useRouter } from 'next/router';

const BaseLayout: React.FC<CustomPropsWithChildren> = ({
  currentUser,
  children,
}) => {
  const router = useRouter();
  const [css, setCss] = useState<string>(`baseLayout justify-start`);
  useEffect(() => {
    router.pathname === '/'
      ? setCss(`baseLayout justify-start`)
      : setCss(`baseLayout justify-between`);
  }, [router.pathname]);
  return (
    <div className={css}>
      <Navbar currentUser={currentUser} />
      {children}
      <div className='h-fit w-full flex flex-row justify-between  items-start p-4 md:px-36 md:max-w-[1200px]'>
        <ul className='flex flex-col gap-4 font-extralight text-sm text-gray-500 w-fit text-left '>
         <li className=''>Copyright MyFin 2022 ©</li>
         </ul>
        <ul className='flex flex-col gap-4 font-extralight text-sm text-gray-500 w-fit text-right '>
         <li className='hover:cursor-pointer hover:underline underline-offset-4 hover:opacity-75'>About us</li>
         <li className='hover:cursor-pointer hover:underline underline-offset-4 hover:opacity-75'>Guide</li>
         </ul>
      </div>
    </div>
  );
};

export default BaseLayout;

/*
export async function getInitialProps(
  context: any,
  client: any,
  currentUser: any
){
  return currentUser;
}
*/
