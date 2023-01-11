
import { Fragment, useEffect, useState, useReducer } from 'react';
import { currentUserProps, profileState, profileUpdateActionTypeKey, userProfileData, userStateData } from '@modules/common/types/types-interfaces';
import DoRequest from '@modules/common/hooks/do-request';
import axios from 'axios';
import { toNormalCase } from '@modules/common/utils/utility-functions';
import profileReducer from '@modules/common/utils/update-profile-reducer';
import Router from 'next/router';
import Formerrors from '../Form/Form-Errors';

//type userStateData = Omit<userProfileData, 'id' | 'createdAt'>

const initialState: profileState = {
  monthlySalary: 0,
  currency: 'vnd',
  phone: '',
  savingsTarget: 0
}


const UpdateProfile: React.FC<any> = ({ currentUser }) => {

  const [state, dispatch] = useReducer(profileReducer, initialState)

  let { doRequest, errors: apiRequestErrors } = DoRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/finances/user`,
    method: 'post',
    body: { ...state, email: currentUser.email, username: currentUser.username },
    onSuccess: () => Router.push('/user/profile'),
  });

  const initData = (data: userStateData) => {
    for (let dataItem of data) {
      //console.log(dataItem.tag)
      //console.log(!!(initialState as any)[dataItem.tag as string])
      if (initialState.hasOwnProperty(dataItem.tag)) {
        console.log('dataItem: ' + dataItem.tag)
        dispatch({ type: 'UPDATE', value: dataItem.value, key: (dataItem.tag as profileUpdateActionTypeKey) })

      }
    }
  }

  const getUserData = async (email: string) => {
    let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/finances`, { email }, { withCredentials: true })
    let results = []
    let responseData = response.data
    for (let key in responseData as userProfileData) {
      console.log(key, responseData[key])
      let temp = {
        name: toNormalCase(key),
        value: responseData[key],
        tag: key
      }
      results.push(temp)
    }
    // console.log(results)
    initData(results)

  }

  useEffect(() => {
    getUserData(currentUser.email)



  }, [])


  useEffect(() => {

  }, [])



  const onSubmit = () => {
    console.log({
      monthlySalary: state.monthlySalary,
      currency: state.currency,
      phone: state.phone,
      savingsTarget: state.savingsTarget
    })
    doRequest();
  }
  return (
    <div className='max-w-[calc(900px)] w-[90vw] h-[calc(85vh)] flex mt-14 items-start justify-center z-10'>
      <div className='h-[95%] w-[95%] flex flex-col gap-4  bg-white  rounded-md px-8 py-4 text-xl font-bold'>
        <div className='py-4 h-20 flex justify-between font-extrabold'>{currentUser.username} <Formerrors errors={apiRequestErrors} /></div>
        <div className='flex flex-col gap-2 text-sm'>
          <label htmlFor='monthlySalary'>Monthly Salary:</label>
          <input
            value={state.monthlySalary}
            onChange={(e) => dispatch({ type: 'UPDATE', value: e.target.value, key: 'monthlySalary' })}
            placeholder='monthly income/salary'
            className='input'
          />
        </div>
        <div className='flex flex-col gap-2 text-sm'>
          <label htmlFor='currency'>Currency:</label>
          <select
            value={state.currency}
            onChange={(e) => dispatch({ type: 'UPDATE', value: e.target.value, key: 'currency' })}
            className='input hover:cursor-pointer'
          >
            <option value='usd'>USD</option>
            <option value='gbp'>GBP</option>
            <option value='vnd'>VND</option>

          </select>
        </div>
        <div className='flex flex-col gap-2 text-sm'>
          <label htmlFor='phoneNumber'>Phone Number:</label>
          <input
            value={state.phone}
            onChange={(e) => dispatch({ type: 'UPDATE', value: e.target.value, key: 'phone' })}
            placeholder='Phone Number'
            className='input'
          />

        </div>
        <div className='flex flex-col gap-2 text-sm'>
          <label htmlFor='savingsTarget'>Savings Target</label>
          <input
            value={state.savingsTarget}
            onChange={(e) => dispatch({ type: 'UPDATE', value: e.target.value, key: 'savingsTarget' })}
            placeholder='Savings Target'
            className='input'
          />

        </div>
        <button className='signInButton' onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default UpdateProfile 
