import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "./Spinner";
import {createPost, newPostSlice} from "../redux/features/newPostSlice";
import {imageToBase64} from "../data_process/image";

function NewPost() {
    const fileInput = useRef(null)
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [text, setText] = useState('');
    const user = useSelector(state => state.logIn.user)
    const { loading, newPostError, success} = useSelector(state => state.newPost)
    const dispatch = useDispatch()
    const {logged} = useSelector(state => state.display)

    const inputFile = (e) => {
        e.preventDefault()
        fileInput.current.click()
    }

    const handleFileInput = (e) => {
        e.preventDefault()
        const inputFile = e.target.files[0]
        if(inputFile.type !== "image/png" && inputFile.type !== "image/jpg" && inputFile.type !== "image/jpeg") {
            setError('Format accepted : jpg, png, jpeg')
            return
        }
        setFile(inputFile)
    }

    const textChange = (e) => {
        e.preventDefault();
        setText(e.target.value)
    }

    const submitPost = (e) => {
        e.preventDefault()
        dispatch(newPostSlice.actions.newPostReset())
        if(!user) {
            return setError('No user logged in');
        }
        const postData = {userID: user._id}
        if(!text && !file) {
            return setError('Write some text or choose an image');
        }
        if(text) postData['text'] = text
        if(file) postData['media'] = file
        dispatch(createPost(postData))
        setText('')
        setFile(null)
    }

    return(
        <>{
            loading ? <Spinner />
                : logged ? <form id="newpost">
                    <div class='success'>{success ? 'Post created' : ''}</div>
                    <div className='error'>{newPostError && !success ? newPostError : ''}</div>
                    <div className='error'>{error && !success ? error : ''}</div>
                    {user.picture ? <img src={imageToBase64(user.picture)} alt="your profile" id="newpostpicture"/> : null}
                    <input type="text" placeholder="Write a new post" id="newposttext" onChange={textChange}/>
                    <input id='inputfile' type="file" onChange={handleFileInput} ref={fileInput}/>
                    <button onClick={inputFile}>{file ? file.name : "Select a file"}</button>
                    <button type="submit" onClick={submitPost}>Post</button>
                </form>
                : <div id='newpost'>Connect to be able to post</div>
        }</>

    );
}


export default NewPost;