import React, { Fragment, PropsWithChildren, useContext, useEffect } from 'react';
import { CustomPropsWithChildren } from '@modules/common/types/types-interfaces';
import Navbar from '../Fragments/Navbar';
import { CurrentUserContext } from '@modules/common/hooks/current-user-context';

const BaseLayout: React.FC<CustomPropsWithChildren> = (props) => {
  const userCtx = useContext(CurrentUserContext)

 
  return (
    <div className='p-4 flex flex-col justify-between items-center min-h-screen h-fit bg-gray-100'>
      <Navbar currentUser={props.currentUser} />
      {props.children}
      <div>Footer</div>
    </div>
  );
};

export default BaseLayout;
