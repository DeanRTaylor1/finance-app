import { currentUserProps, OutgoingRecord } from "@modules/common/types/types-interfaces"

import { Fragment, useState } from "react"
import axios from "axios";
import Router from "next/router";


type TableRowProps = {
  outgoing: OutgoingRecord
  currentUser: currentUserProps
}

function numberWithCommas(x: number) {
  if (!x) {
    return
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const TableRow: React.FC<TableRowProps> = ({ outgoing, currentUser }) => {
  const deleteItemHandler = async () => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/finances/outgoings`, { headers: { item: outgoing.item, userid: +outgoing.userId }, withCredentials: true })
    Router.reload()
  }


  return (
  <Fragment>
      <tr>
        <td className="px-4 py-2 text-sm font-bold text-gray-800 whitespace-nowrap">
          {outgoing.item}
        </td>
        <td className="px-4 py-2 text-sm font-bold text-gray-800 whitespace-nowrap" >
          {numberWithCommas(outgoing.cost)}
        </td>
        <td className="px-4 py-2 text-sm font-bold text-gray-800 whitespace-nowrap">
          {outgoing.tag}
        </td>
        {/* <td className="px-4 py-2 text-sm font-medium text-right whitespace-nowrap">
          <a
            className="text-green-500 hover:text-green-700"
            href="#"
          >
            Edit
          </a>

          </td> */}

        <td className="px-4 py-2 text-sm font-medium text-right whitespace-nowrap">
          <a
            className="text-red-500 hover:text-red-700"
            href="#"
            onClick={(e) => (deleteItemHandler())}
          >
            Delete
          </a>
        </td>
      </tr>
    </Fragment>
  )
}


export default TableRow
