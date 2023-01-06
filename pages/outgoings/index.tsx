import OutgoingsPage from "@modules/common/components/Fragments/outgoings/page";
import { color } from '@modules/common/types/types-interfaces';
import axios from "axios";
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';

function Outgoings({ currentUser }: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [userState, setUserState] = useState<any>()

  const checkLoggedIn = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/users/currentuser`,
        { withCredentials: true }
      );
      console.log(data.currentUser)
      setUserState(data.currentUser)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      Router.push('/auth/signin')
    }
  }

  useEffect(() => {
    if (!currentUser) {
      checkLoggedIn();
    } else {
      setUserState(currentUser)
      setIsLoading(false)
    }
  }, []);


  return (
    <Fragment>
      {isLoading && <div className='h-full w-full flex justify-center items-center'> <CircleLoader size={100} color={color.blue} /> </div>}
      {!isLoading && <OutgoingsPage currentUser={userState} />}
    </Fragment>
  )
}


export default Outgoings;



Outgoings.getInitialProps = async (
  context: any,
  client: any,
  currentUser: any
) => {
  return currentUser;
}
