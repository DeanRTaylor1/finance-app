import React, { Fragment, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { CustomPropsWithChildren } from '@modules/common/types/types-interfaces';
import Navbar from '../Fragments/Navbar';
import { useRouter } from 'next/router';

const BaseLayout: React.FC<CustomPropsWithChildren> = ({ currentUser, children }) => {
  const router = useRouter();
  const [css, setCss] = useState<string>(`baseLayout justify-start`);
  useEffect(() => {
    router.pathname === '/' ? setCss(`baseLayout justify-start`) : setCss(`baseLayout justify-between`)
  }, [router.pathname])
  return (
    <div className={css}>
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
