import React from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import Link from 'next/link';
import Logo from '../assests/logo2.jpg'
function Navbar() {
  const router = useRouter()
  const logout = async () =>{
    await signOut(auth);
    router.push('/login')
  }
  return (
    <div style={{display: 'flex', flexDirection:'row', width: '100vw', height: '3rem', alignItems: 'center'}}>
      <div style={{width: '5rem', height: '5rem'}}>
        <img src={Logo} style={{ height: '100%', width: '100%', objectFit: 'cover', overflow: 'hidden' }}/>
      </div>
      <div style={{display: 'flex', flexDirection:'row', backgroundColor: 'yellow', justifyContent: 'space-around', width: '100%', height: '100%', alignItems: 'center'}}>
        <Link href='/'>Home</Link>
        <Link href='/profile'>Profile</Link>
        <div onClick={logout}>Logout</div>
      </div>
    </div>
  )
}

export default Navbar