
import { createContext, useState, useEffect } from "react";
import { currentUserProps } from "../types/types-interfaces";

const CurrentUserContext = createContext({
  currentUser: {} as currentUserProps,
  updateUser: (updateUser:currentUserProps) => {}
})

export function CurrentUserContextProvider(props:any){
  const [currentUserData, setCurrentUserData] = useState<currentUserProps>({} as currentUserProps);

  const addCurrentUserData = (currentUser:currentUserProps) => {
    setCurrentUserData(currentUser)
  }

  const context ={
    currentUser: currentUserData,
    updateUser: addCurrentUserData,
  }

  return(
    <CurrentUserContext.Provider value={context}>
    {props.children}
    </CurrentUserContext.Provider>
  )
}

export {CurrentUserContext}

