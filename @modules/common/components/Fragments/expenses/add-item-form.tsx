import DoRequest from "@modules/common/hooks/do-request"
import Link from "next/link"
import Router from "next/router"
import { useState } from "react"
import Formerrors from "../../Form/Form-Errors"
import Input from "../../Form/Input"
import DatePickerComponent from "./date-picker"









const AddItemForm: React.FC<any> = ({ currentUser, activateModalHandler, getUserRecords, getCount }) => {
  const [itemName, setItemName] = useState('')
  const [tag, setTag] = useState('')
  const [cost, setCost] = useState('')
  const [currency, setCurrency] = useState('')
  const [date, setDate] = useState(new Date());

  const { doRequest, errors } = DoRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/finances/expenses`,
    method: 'post',
    body: { email: currentUser.email, item: itemName, tag, cost, currency, dateSpent: date.toISOString() },
    onSuccess: () => {
      getUserRecords(currentUser.email)
      getCount(currentUser.email)
    }
    ,
  });


  const getItemName = (e: React.FormEvent<HTMLInputElement>) => {
    setItemName(e.currentTarget.value);
  };
  const getTag = (e: React.FormEvent<HTMLInputElement>) => {
    setTag(e.currentTarget.value);
  };
  const getCost = (e: React.FormEvent<HTMLInputElement>) => {
    setCost(e.currentTarget.value);
  };
  const getCurrency = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrency(e.currentTarget.value);
  };
  const getDate = (date: Date) => {
      console.log(date.toISOString())
      setDate(date)
    }

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    doRequest();
    setItemName('');
    setTag('');
    setCost('');
    setCurrency('');
    setDate(new Date())
    activateModalHandler();

  };


  return (
    <div className="w-screen h-screen fixed -top-40 left-0 bg-transparent flex flex-col items-center justify-center ">
      <div className="h-96 w-96  rounded-md shadow-2xl flex flex-col">
        <form
          onSubmit={formSubmitHandler}
          className='h-fit w-96 flex flex-col shadow-2xl bg-white  rounded-md px-8 py-4 text-xl font-bold'
        >
          <div className='py-4 h-20 flex justify-between'>
            Add Item <Formerrors errors={errors} />
          </div>
          <div className='flex flex-col gap-8'>
            <Input
              name={'Name:'}
              label={'itemName'}
              type={'text'}
              placeholder={'Item name'}
              getInputs={getItemName}
              value={itemName}
            />
            <Input
              name={'Tag:'}
              label={'tag'}
              type={'text'}
              placeholder={'Item Tag'}
              getInputs={getTag}
              value={tag}
            />
            <Input
              name={'Cost:'}
              label={'itemCost'}
              type={'text'}
              placeholder={'Item Cost'}
              getInputs={getCost}
              value={cost}
            />
            <div className='flex flex-col gap-2 text-sm'>
              <label htmlFor='currency'>Currency:</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className='input hover:cursor-pointer'
              >
                <option value='gbp'>gbp</option>
                <option value='vnd'>vnd</option>

              </select>
            </div>
            <div className='flex flex-col gap-2 text-sm'>
              <label htmlFor='date'>Date:</label>
             <DatePickerComponent date={date} getDate={getDate} /> 
            </div>


            <div className="flex gap-2">
              <button className='signInButton w-[calc(50%)] bg-red-400 hover:bg-red-500 focus:bg-red-500' onClick={activateModalHandler}>Cancel</button>
              <button className='signInButton w-[calc(50%)]'>Add</button>
            </div>        </div>
        </form>

      </div>
    </div>

  )


}


export default AddItemForm




