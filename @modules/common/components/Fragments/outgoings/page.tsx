import axios from "axios";
import { useEffect, useState } from "react";
import { currentUserProps, OutgoingRecord } from '@modules/common/types/types-interfaces'
import TableHead from "./table-head";
import TableRow from "./table-row";
import Input from "../../Form/Input";
import Formerrors from "../../Form/Form-Errors";
import AddItemForm from "./add-item-form";
const OutgoingsPage: React.FC<any> = ( {currentUser} ) => {

  const [userOutgoings, setUserOutgoings] = useState<OutgoingRecord[]>([{} as OutgoingRecord])
  const [modalActive, setModalActive] = useState<Boolean>(false)

  const activateModalHandler = () => {
    modalActive ? setModalActive(false) : setModalActive(true)
  }


  const getUserRecords = async (email: string) => {

    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/finances/outgoings`, { headers: { email }, withCredentials: true })

    setUserOutgoings(response.data)

    console.log(response.data)
  }

  useEffect(() => {
     getUserRecords(currentUser.email)
  }, [])



  return (
    <div className='w-[90vw] h-[calc(85vh)] flex mt-14 items-start justify-center z-10 max-w-[calc(900px)]'>
      <div className='h-[95%] w-[95%] flex flex-col gap-4 pt-8 bg-white  rounded-md px-8 py-4 text-xl font-bold'>
        <span className="flex justify-between items-center"><h1>
          Monthly Outgoings:
        </h1>
          <button className="navButton w-36" onClick={activateModalHandler}>Add Item</button>
        </span>        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-x-hidden md:overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <TableHead />
                  <tbody className="divide-y divide-gray-200 font-medium">
                    {userOutgoings && userOutgoings.map((outgoing, index) => {
                      return (<TableRow key={index} outgoing={outgoing} currentUser={currentUser} getUserRecords={getUserRecords} />)
                    })}


                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
        {modalActive && <AddItemForm getUserRecords={getUserRecords} currentUser={currentUser} activateModalHandler={activateModalHandler} />}
      </div>
    </div>)
}


export default OutgoingsPage;
