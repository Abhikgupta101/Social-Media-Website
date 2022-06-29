import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import { Cart, ContextState } from '../../context/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
function index() {

  const { user, setUser } = useContext(Cart)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const signin = async () => 
  {
      console.log(user)
      try {
          const res = await signInWithEmailAndPassword(auth, email, password);
          console.log(res);
          setUser(res)
          router.push('/')
      } catch (error) {
          console.log(error.message)
      }
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  const Redirect = () => {
    router.push('/')
  }


  return (
    <>
    {
      user?<Redirect/>:
      <div className='login_container'>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>Login</div>
        <div className='login_card'>
          <input type='email' className='login_input' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <input type='password' className='login_input' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <Button variant="contained" component="label" fullWidth style={{ marginTop: '1rem' }} onClick={signin}>
            Login
          </Button>
        </div>
        <div style={{ position: 'absolute', bottom: '20%' }}>Don&apos;t Have An Account? Sign Up</div>
      </div>
    }
    </>
  )
}

export default index