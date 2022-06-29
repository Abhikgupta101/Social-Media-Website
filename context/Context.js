import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../Firebase";

export const Cart = React.createContext()

function Context({children}) {
    const [user, setUser] = React.useState('')
    const [userId, setUserId] = React.useState('')
    useEffect(() => 
    {
      console.log(user)
      onAuthStateChanged(auth, (user) =>
      {
        if(user){
          setUser(user)
          setUserId(user.uid)
        }
        else{
          setUser('')
          setUserId('')
        }
      })
  }, [])

  function login(email,password){
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const store = {
    user,
    login
  }
  return (
    <Cart.Provider value={store}>
        {children}
    </Cart.Provider>
  )
}


export default Context