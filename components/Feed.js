import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Upload from './Upload'
import SinglePost from './SinglePost'
import { Cart } from '../context/Context'
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../Firebase';

function Feed() {
  const { user, userId } = useContext(Cart)
  const [userData, setUserData] = React.useState({});
  const [post, setPost] = React.useState([])

  useEffect(() => {
    if (user.uid) {
      const unsub = onSnapshot(doc(db,
        "users", user.uid), (doc) => {
          setUserData(doc.data())
        })
      return () => {
        unsub();
      }
    }

  }, [user])

  const colRef = collection(db, 'posts')
  useEffect(() => {
    const unsub = onSnapshot(query(colRef, orderBy("postTime", "desc")),(snapshot) => {
      let tempArray = []
      snapshot.docs.forEach((doc) => {
        tempArray.push({ ...doc.data() })
      })

      setPost([...tempArray])
    })
    return () => {
      unsub();
    }

  }, [])

  return (
    <div className='feed_container'>
      <Navbar />
      <Upload userData={userData} />
      {
        post.map((postData) => (
          <div key={postData.postUid} style={{ marginTop: '1rem' }}>
            <SinglePost postData={postData}/>
          </div>
        ))
      }
    </div>

  )
}

export default Feed