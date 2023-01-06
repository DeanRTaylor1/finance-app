import axios from "axios";
import { useEffect, useState } from "react";
import { currentUserProps, OutgoingRecord } from '@modules/common/types/types-interfaces'
import TableHead from "./table-head";
import TableRow from "./table-row";
const OutgoingsPage: React.FC<any> = ({ currentUser }) => {

  const [userOutgoings, setUserOutgoings] = useState<OutgoingRecord[]>([{} as OutgoingRecord])

  const getUserRecords = async (email: string) => {

    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/finances/outgoings`, { headers: { email }, withCredentials: true })

    setUserOutgoings(response.data)

    console.log(response.data)
  }

  useEffect(() => {
    console.log(currentUser)
    getUserRecords(currentUser.email)
  }, [])

  return (<div className='w-[90vw] h-[calc(85vh)] flex mt-14 items-start justify-center z-10 max-w-[calc(900px)]'>
    <div className='h-[95%] w-[95%] flex flex-col gap-4 pt-8 bg-white  rounded-md px-8 py-4 text-xl font-bold'>
      Monthly Outgoings:
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-x-hidden md:overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
              <TableHead />
                <tbody className="divide-y divide-gray-200 font-medium">
                 {userOutgoings && userOutgoings.map((outgoing, index) => {
                     return (<TableRow key={index} outgoing={outgoing} currentUser={currentUser} />)
                   })}                  


                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}


export default OutgoingsPage;
