import React, {useRef, useState} from "react";
import '../stylesheet.css'
import {useDispatch, useSelector} from "react-redux";
import {imageToBase64} from "../data_process/image";
import {displaySlice} from "../redux/features/displaySlice";
import {fetchPostsDiscover} from "../redux/features/postsSlice";
import Spinner from "./Spinner";
import {changePlace} from "../redux/features/settingsSlice";

function SettingsPage() {
    const { user } = useSelector(state => state.logIn)
    const [file, setFile] = useState(null);
    const fileInput = useRef(null)
    const [error, setError] = useState('');
    const [bio, setBio] = useState('');
    const [place, setPlace] = useState('');
    const dispatch = useDispatch()
    const { loadingUserName, successUserName, errorUserName, loadingPlace, successPlace, errorPlace, loadingBio, successBio, errorBio, loadingPicture, successPicture, errorPicture, loadingFriends, successFriends, errorFriends } = useSelector(state => state.settings)

    let img ="";
    if(user.picture) {
        img = <img className='contentprofilepicture' src={imageToBase64(user.picture)} alt='post media' ></img>
    }

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

    const submitPicture = () => {
    }

    const bioChange = (e) => {
        e.preventDefault();
        setBio(e.target.value)
    }

    const placeChange = (e) => {
        e.preventDefault();
        setPlace(e.target.value)
    }

    const leaveSettings = () => {
        dispatch(fetchPostsDiscover())
        dispatch(displaySlice.actions.goToDiscover())
    }

    const submitBio = () => {

    }
    const submitPlace = () => {
        dispatch(changePlace({ id: user._id, newBio: bio }))
    }

    return (
        <div id="settingspage">
            <button onClick={leaveSettings}>X</button>
            <h1 class="settingtitle">Profile settings</h1>
                {img ? img : "Error could not load the image"}
                <p class="setting">Change Profile Picture</p>
                <input id='inputfile' type="file" onChange={handleFileInput} ref={fileInput}/>
                <button onClick={inputFile}>{file ? file.name : "Select a file"}</button>
                <div className="error">{error ? error : ''}</div>
                <button onClick={submitPicture}>Submit</button>
            <div class="setting">
                { loadingPlace ? <Spinner />
                    : <>
                        <input type="text" placeholder="Change Place" className="setting settingtext" onChange={placeChange}/>
                        <button class="settingsubmit" onClick={submitPlace}>Submit</button>
                    </>
                }
            </div>
            <div class="setting">
                <textarea placeholder="Change Bio" class="setting settingtext" onChange={bioChange}/>
                <button class="settingsubmit" onClick={submitBio}>Submit</button>
            </div>
            <h1 class="settingtitle">Display settings</h1>
                <p class="setting">Dark Mode</p>
        </div>
    );

}


export default SettingsPage;