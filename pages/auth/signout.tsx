import Router from 'next/router';
import { useEffect } from 'react';
import { CircleLoader } from 'react-spinners';
import DoRequest from '@modules/common/hooks/do-request';

const SignOut = () => {
  const { doRequest } = DoRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/users/signout`,
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <CircleLoader size={100} color='#60a5fa' />
    </div>
  );
};

export default SignOut;
