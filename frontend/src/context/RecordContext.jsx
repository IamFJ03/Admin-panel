import React,{ useContext, createContext, useState } from 'react'

const GlobalContext = createContext(null);
export default function RecordContext({children}) {
    
    const [adminData, setAdminData] = useState({});
    const [record, setRecord] = useState({});
  return (
    <GlobalContext.Provider value={{adminData, setAdminData, record, setRecord}}>
        {children}
    </GlobalContext.Provider>
  )
}

export const useRecord = () =>{
    return useContext(GlobalContext);
}