import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import LoginForm from '@modules/common/components/Form/LoginForm';
import Stripes from '@modules/common/components/Fragments/Stripes';
import { CircleLoader } from 'react-spinners';
import { color, PropsWithAuth } from '@modules/common/types/types-interfaces';

const Signin: React.FC<PropsWithAuth> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(() => {
    if (currentUser) {
      Router.back();
    }
    if (!currentUser) {
      setIsLoading(false);
    }
  }, []);

  return (
    <Fragment>
      {!isLoading && <LoginForm />}
      {!isLoading && <Stripes />}
      {isLoading && (
        <div className='h-full w-full flex justify-center items-center'>
          <CircleLoader size={100} color={color.blue} />
        </div>
      )}
    </Fragment>
  );
};

export default Signin;
