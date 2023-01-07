import React, { Fragment, PropsWithChildren, useContext, useEffect } from 'react';
import { CustomPropsWithChildren } from '@modules/common/types/types-interfaces';
import Navbar from '../Fragments/Navbar';

const BaseLayout: React.FC<CustomPropsWithChildren> = ({currentUser, children}) => {
  return (
    <div className='p-4 flex flex-col justify-between items-center min-h-screen h-fit bg-gray-100'>
      <Navbar currentUser={currentUser} />
      {children}
      <div>Footer</div>
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
