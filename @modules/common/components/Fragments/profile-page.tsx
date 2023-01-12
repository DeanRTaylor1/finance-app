import { Fragment, useEffect, useState } from 'react';
import {
  currentUserProps,
  userProfileData,
  userStateData,
} from '@modules/common/types/types-interfaces';
import DoRequests from '@modules/common/hooks/do-request';
import axios from 'axios';
import { toNormalCase } from '@modules/common/utils/utility-functions';
import Link from 'next/link';
import { numberWithCommas } from '@modules/common/utils/number-with-comma';
import LoadingCircle from '../loadingbar/loading-circle';
import DoRequest from '@modules/common/hooks/do-request';
import Router from 'next/router';

//type userStateData = Omit<userProfileData, 'id' | 'createdAt'>

const ProfilePage: React.FC<any> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  //redirect if no current user and populate user data from api
  const [userData, setUserData] = useState<userStateData | null>(null);
  const [confirmDeleteModalActive, setConfirmDeleteModalActive] = useState<Boolean>(false)



  const doRequest = async (email: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/users`, { headers: { email }, withCredentials: true })
      Router.push('/')

    } catch (err) {
      console.log(err)
      Router.reload()
    }
  }


  const getUserData = async (email: string) => {
    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}api/finances`,
      { email },
      { withCredentials: true }
    );
    let results = [];
    let responseData = response.data;
    for (let key in responseData as userProfileData) {
      console.log(key, responseData[key]);
      let temp = {
        name: toNormalCase(key),
        value: responseData[key],
        tag: key,
      };
      results.push(temp);
    }
    // console.log(results)
    setUserData(results);
  };

  useEffect(() => {
    getUserData(currentUser.email);

    let loadingTimer = setTimeout(() => setIsLoading(false), 500);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className=' max-w-[calc(900px)] w-[90vw] h-[calc(85vh)] flex mt-14 items-start justify-center z-10'>
      <div className={`h-[95%] w-[95%] flex flex-col gap-4  bg-white  rounded-md px-8 py-4 text-xl font-bold ${(confirmDeleteModalActive) ? 'filter blur-md' : ''}`}>
        <div className='py-4 h-20 flex justify-between underline underline-offset-4 font-extrabold '>
          {currentUser.username}
        </div>
        {isLoading && (
          <div className='h-36 w-full flex justify-center items-center'>
            <LoadingCircle />{' '}
          </div>
        )}

        {!isLoading &&
          userData!
            .filter(
              (item) =>
                item.name !== 'Created At' &&
                item.name !== 'Updated At' &&
                item.name !== 'Username'
            )
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className='p-2 border-b border-dashed border-slate-200 flex flex-col gap-2'
                >
                  {item.name}:{' '}
                  <div className='font-extralight text-lg'>
                    {isNaN(+item.value) || item.name === 'Phone'
                      ? item.value
                      : numberWithCommas(+item.value)}{' '}
                  </div>
                </div>
              );
            })}
        {!isLoading && (
          <Link href='/user/profile/update'>
            {' '}
            <button className='signInButton'>Update Details</button>{' '}
          </Link>
        )}
        {!isLoading && (
          <button className='signInButton bg-red-600 hover:bg-red-800 focus:bg-red-800' onClick={(e) => {
            e.preventDefault()
            setConfirmDeleteModalActive(true)
          }
          }>
            Delete Account
          </button>
        )}
      </div>
      {confirmDeleteModalActive && (
        <Fragment>
          <div className='w-screen h-[1000px] fixed -top-40 left-0 z-99 flex flex-col items-center justify-center '>

            <div className='h-fit w-96  rounded-md shadow-2xl flex flex-col'>
              <form
                className='h-fit w-96 flex flex-col gap-8 shadow-2xl bg-white  rounded-md px-8 py-4 text-xl font-bold'
              >
                <div className='py-4 h-20 flex justify-between'>
                  Confirm Deletion (this can not be undone!)
                </div>
                <div className='flex flex-row-reverse gap-2'>
                  <button
                    className='signInButton w-[calc(50%)] bg-red-400 hover:bg-red-500 focus:bg-red-500 h-[55px]' onClick={(e) => {
                      e.preventDefault()
                      doRequest(currentUser.email)
                    }
                    }>
                    Delete Forever
                  </button>
                  <button className='signInButton w-[calc(50%)] h-[55px]' onClick={(e) => {
                    e.preventDefault()
                    setConfirmDeleteModalActive(false)
                  }
                  }>Go Back</button>
                </div>{' '}

              </form>
            </div>
          </div>
        </Fragment>
      )}

    </div>
  );
};

export default ProfilePage;
