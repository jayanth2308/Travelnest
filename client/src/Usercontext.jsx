import React,{ createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext()



export function UserContextProvider({children}) {

    const [User,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    useEffect(()=>{
        if(!User){
            axios.get('/profile').then(({data})=>{
                setUser(data);
                setReady(true);
            }) 
        }
    },[User])

   return(
    <UserContext.Provider value={{User,setUser}}>
        {children}
    </UserContext.Provider>
   )
}
