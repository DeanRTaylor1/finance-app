

import ProfilePage from '@modules/common/components/Fragments/profile-page';
import UpdateProfile from '@modules/common/components/Fragments/Update-Profile';
import { color } from '@modules/common/types/types-interfaces';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';


export default function Profile({ currentUser }: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  console.log(color.blue)


  useEffect(() => {
    if (!currentUser) {
      Router.push('/auth/signin')
    } else {
      setIsLoading(false)
    }
  }, []);
  return (
    <Fragment>
      {isLoading && <div className='h-full w-full flex justify-center items-center'> <CircleLoader size={100} color={color.blue} /> </div>}
      {!isLoading && <UpdateProfile currentUser={currentUser} />}
    </Fragment>
  );



}


Profile.getInitialProps = async (
  context: any,
  client: any,
  currentUser: any
) => {
  return currentUser;
}
