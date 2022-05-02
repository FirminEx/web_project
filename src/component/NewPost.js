import React, {useRef, useState} from "react";
import placeholder from "../img/placeholder.jpg"
import {useDispatch, useSelector} from "react-redux";
import Spinner from "./Spinner";
import {createPost, newPostSlice} from "../redux/features/newPostSlice";

function NewPost() {
    const fileInput = useRef(null)
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [text, setText] = useState('');
    const user = useSelector(state => state.logIn.user)
    const { loading, newPostError, success} = useSelector(state => state.newPost)
    const dispatch = useDispatch()

    const inputFile = (e) => {
        e.preventDefault()
        fileInput.current.click()
    }

    const handleFileInput = (e) => {
        e.preventDefault()
        const inputFile = e.target.files[0]
        if(inputFile.type !== "images/png" && inputFile.type !== "images/jpg" && inputFile.type !== "images/jpeg") {
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
        const postData = {author: user.userName, authorID: user._id}
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
                : <form id="newpost">
                    <div class='success'>{success ? 'Post created' : ''}</div>
                    <div className='error'>{newPostError && !success ? newPostError : ''}</div>
                    <div className='error'>{error && !success ? error : ''}</div>
                    <img src={placeholder} alt="your profile" id="newpostpicture"/>
                    <input type="text" placeholder="Write a new post" id="newposttext" onChange={textChange}/>
                    <input id='inputfile' type="file" onChange={handleFileInput} ref={fileInput}/>
                    <button onClick={inputFile}>{file ? file.name : "Select a file"}</button>
                    <button type="submit" onClick={submitPost}>Post</button>
                </form>
        }</>

    );
}


export default NewPost;