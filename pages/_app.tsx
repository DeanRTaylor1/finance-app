import '../styles/globals.css';
import React, { useContext, useEffect } from 'react'
import Head from 'next/head';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import BaseLayout from '@modules/common/components/Layouts/Base-Layout';
import BuildClient from './api/build-client';
import { currentUserProps } from '@modules/common/types/types-interfaces';
import axios from 'axios';
import { CurrentUserContext, CurrentUserContextProvider } from '@modules/common/hooks/current-user-context';
import { NextPageContext } from 'next';

interface CustomProps extends AppProps {
  currentUser?: currentUserProps;
}



export default function App({
  Component,
  pageProps,
  currentUser,
}: CustomProps) {


  return (

    <BaseLayout currentUser={currentUser}>
      <Head>
        <title>My Finance</title>
      </Head>
      <Component {...pageProps} currentUser={currentUser} />
    </BaseLayout>


  );
}

 App.getInitialProps = async (appContext: any) => {

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/users/currentuser`,
    { withCredentials: true }
  );

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      data.currentUser
    );
  }

  return { pageProps, ...data };
};



