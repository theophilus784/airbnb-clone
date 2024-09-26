import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({})

export function AuthContextProvider({children}){
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if(!user){
      const {data} = axios.get('/profile').then(({data}) => {
        setUser(data)
        setReady(true)
      })
    }
  }, [])
  return (
    <AuthContext.Provider value={{user, setUser, ready}}>
      {children}
    </AuthContext.Provider>
  )
}

