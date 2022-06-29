import React, {useState} from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../Firebase';
function Upload({userData}) {
    const [file, setFile] = React.useState(null)
    const [fileLoad, setFileLoad] = useState(0)
    const upload = () => 
    {
        if (file == null) {
            return;
        }
        let uid = uuidv4();
        const storageRef = ref(storage, `${userData.uid}/post/${uid}`);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setFileLoad(progress)
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
                        profileName: userData.name,
                        postId: uid,
                        likes: [],
                        profileImg: userData.photoURL,
                        postImg: downloadURL,
                        post: [],
                        uid: userData.uid,
                        postUid: uid,
                        postTime: serverTimestamp()

                    }
                    await setDoc(doc(db, "posts", uid), obj)
                    await updateDoc(doc(db, "users", userData.uid), {
                        post: arrayUnion(uid)
                    });
                });
                setFileLoad(0)
                setFile(null)
            }
        );
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem' }}>
                <Button variant="outline" component="label" style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: 'black', color: 'white' }}>
                    <input type="file" accept='image/*' style={{ display: 'none' }}  onChange={(e) => setFile(e.target.files[0])}></input>
                    <AddBoxIcon style={{ marginRight: '0.5rem' }}  onClick={upload}/>
                </Button>
                <Button style={{color: 'blue'}} onClick={upload}>Upload</Button>
                <LinearProgress variant="determinate" value={fileLoad} style={{width: '10rem' }} />
            </div>
            
        </div>
    )
}

export default Upload