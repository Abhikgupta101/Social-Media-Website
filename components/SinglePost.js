import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { Cart } from '../context/Context';

function SinglePost({ postData}) {
    const { user } = useContext(Cart)
    const [likes, setLikes] = useState(false)
    const updateLike = async () => {
        if (likes == false) {
            console.log(postData.postUid)
            await updateDoc(doc(db, "posts", postData.postUid), {
                likes: arrayUnion(user.uid)
            });
            setLikes(true)
        }
        else {
            console.log(postData.postUid)
            await updateDoc(doc(db, "posts", postData.postUid), {
                likes: arrayRemove(user.uid)
            });
            setLikes(false)
        }
    }

    useEffect(() => {
            if(postData.likes.includes(user.uid)){
                setLikes(true)
              }
              else{
                setLikes(false)
              }
    }, [])
    
    return (
        <div style={{ width: '25rem', height: '25rem'}}>
            <div style={{ width: '100%', height: '100%', marginTop: '0.5rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <div style={{ display: 'flex', width: '100%', height: '11%' }}>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'row', marginLeft: '1rem', alignItems: 'center', flex: '1' }}>
                    <Avatar alt="Remy Sharp" src={postData.profileImg} style={{marginRight: '1rem'}} />
                    {postData.profileName}
                </div>
            </div>
                <div style={{ width: '100%', height: '74%'}}>
                    <img src={postData.postImg} style={{ height: '100%', width: '100%', objectFit: 'cover', overflow: 'hidden' }} />
                </div>
                <div style={{ display: 'flex', width: '100%', height: '15%' }}>
                    <div style={{ height: '100%', justifyContent: 'flex-end'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem', marginTop: '0.1rem', alignItems: 'center' }}>
                            <FavoriteBorderIcon fontSize='large' onClick={updateLike} style={likes ? { color: 'red' } : { color: 'black' }} />
                            {postData.likes.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost