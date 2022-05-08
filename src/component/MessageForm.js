import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createMessage} from "../redux/features/newMessageSlice";
import {fetchConversation} from "../redux/features/conversationSlice";
import Compressor from "compressorjs";

function MessageForm() {
    const fileInput = useRef(null)
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const { user } = useSelector(state => state.logIn)
    const { conversation } = useSelector(state => state.conversation)
    const { errorSend } = useSelector(state => state.newMessage)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const inputFile = (e) => {
        e.preventDefault()
        fileInput.current.click()
    }

    const handleFileInput = async (e) => {
        e.preventDefault()
        const inputFile = e.target.files[0]
        if (inputFile.type !== "image/png" && inputFile.type !== "image/jpg" && inputFile.type !== "image/jpeg") {
            setError('Format accepted : jpg, png, jpeg')
            return
        }
        await new Compressor(inputFile,
            {
                quality: 0.4,
                success(file) {
                    setFile(file)
                },
                error(err) {
                    setError(err.message)
                }
            })
    }

    const textChange = (e) => {
        e.preventDefault();
        setText(e.target.value)
    }

    const submitMessage = async (e) => {
        e.preventDefault()
        const postData = {sender: user._id}
        postData['receiver'] = (conversation.user1 === user._id ? conversation.user2 : conversation.user1)
        if (!text && !file) {
            return setError('Write some text or choose an image');
        }
        if (text) postData['text'] = text
        if (file) postData['media'] = file
        dispatch(createMessage(postData))
        await dispatch(fetchConversation({friendID: (conversation.user1 === user._id ? conversation.user2 : conversation.user1), userID: user._id }))
        setText('')
        setFile(null)
    }

    return(
        <form id='messageform'>
            <div className='error'>{error ? error : ''}</div>
            <div className='error'>{errorSend ? errorSend : ''}</div>
            <input type="text" placeholder="Send a message" id="messagetext" onChange={textChange}/>
            <input id='inputfile' type="file" onChange={handleFileInput} ref={fileInput}/>
            <button onClick={inputFile}>{file ? file.name : "Select a file"}</button>
            <button type="submit" onClick={submitMessage}>Send</button>
        </form>
    )
}

export default MessageForm;