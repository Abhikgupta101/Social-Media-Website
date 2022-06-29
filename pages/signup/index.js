import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../Firebase';
import { Cart } from '../../context/Context';
import { createUserWithEmailAndPassword } from 'firebase/auth';


function index() {
  const { user, setUser, login } = useContext(Cart)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [file, setFile] = React.useState(null)

  const router = useRouter()

  const createUser = async () => {
    console.log(file)
    console.log(user)
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, `${user.user.uid}/profile`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            let obj = {
              name: name,
              email: email,
              uid: user.user.uid,
              photoURL: downloadURL,
              post: []

            }
            await setDoc(doc(db, "users", user.user.uid), obj)
          });
        }
      );
    } catch (error) {
      console.log(error)
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
        user ? <Redirect /> :
          <div className='signup_container'>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>Sign Up</div>
            <div className='signup_card'>
              {/* <div>{user.uid}</div>
      <div>{user.email}</div> */}
              <input type='email' className='signup_input' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <input type='password' className='signup_input' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}  ></input>
              <input type='text' className='signup_input' placeholder='Full name' onChange={(e) => setName(e.target.value)}  ></input>
              <Button variant="outline" component="label" fullWidth style={{ marginTop: '1rem' }}>
                <input type="file" accept='image/*' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])}></input>
                Upload
              </Button>
              <Button variant="contained" component="label" fullWidth style={{ marginTop: '1rem' }} onClick={createUser}>
                Sign Up
              </Button>
            </div>
            <div style={{ position: 'absolute', bottom: '10%' }}>Already Have An Account? Login</div>
          </div>
      }
    </>
  )
}

export default index