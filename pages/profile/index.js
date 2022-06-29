import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Cart} from '../../context/Context';
import SinglePost from '../../components/SinglePost';
import { db } from '../../Firebase';
import Navbar from '../../components/Navbar';

function index() {
    const { user } = useContext(Cart)
    const [post, setPost] = useState([])
    const colRef = collection(db, 'posts')
    
    useEffect(() => {
        if(user.uid)
        {
            const unsub = onSnapshot(query(colRef,where("uid", "==", user.uid)),(snapshot) => {
                let tempArray = []
                snapshot.docs.forEach((doc) => {
                    tempArray.push({ ...doc.data() })
                })
                console.log(tempArray)
                setPost([...tempArray])
                console.log(post)
            })
            return () => {
                unsub();
            }
        }
    }, [user])
    return (
        <>
        <Navbar/>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {
                post.map((postData) => (
                    <div  key={postData.postUid}  style={{margin: '1rem'}} >
                        <SinglePost postData={postData}/>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default index