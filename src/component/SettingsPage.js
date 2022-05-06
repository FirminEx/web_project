import React, {useRef, useState} from "react";
import '../stylesheet.css'
import {useDispatch, useSelector} from "react-redux";
import {imageToBase64} from "../data_process/image";
import {displaySlice} from "../redux/features/displaySlice";
import {fetchPostsDiscover} from "../redux/features/postsSlice";
import Spinner from "./Spinner";
import {changeBio, changePlace, changeUserName, settingsSlice} from "../redux/features/settingsSlice";
import Friend from "./Friend";
import Compressor from 'compressorjs'

function SettingsPage() {
    const { user } = useSelector(state => state.logIn)
    const [file, setFile] = useState(null);
    const fileInput = useRef(null)
    const [error, setError] = useState('');
    const [bio, setBio] = useState('');
    const [place, setPlace] = useState('');
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch()
    const { loadingUserName, successUserName, errorUserName, loadingPlace, successPlace, errorPlace, loadingBio, successBio, errorBio, loadingPicture, successPicture, errorPicture, loadingFriends, successFriends, errorFriends } = useSelector(state => state.settings)
    const { friends } = useSelector(state => state.friends)

    let img ="";
    if(user.picture) {
        img = <img className='contentprofilepicture' src={imageToBase64(user.picture)} alt='post media' ></img>
    }

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
                quality: 0.2,
                success(file)
                    {
                        setFile(file)
                    },
                error(err) {
                    setError(err.message)
                }
            })

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

    const userNameChange = (e) => {
        e.preventDefault();
        setUserName(e.target.value)
    }

    const leaveSettings = () => {
        dispatch(fetchPostsDiscover())
        dispatch(displaySlice.actions.goToDiscover())
    }

    const submitBio = () => {
        dispatch(changeBio({ id: user._id, newBio: bio }))
        setBio('')
    }
    const submitPlace = () => {
        dispatch(changePlace({ id: user._id, newPlace: place }))
        setPlace('')
    }

    const submitUserName = () => {
        if(!(userName.length > 2)) {
            setUserName('')
            return dispatch(settingsSlice.actions.setErrorUserName('User Name must be at least 3 characters'))
        }
        dispatch(changeUserName({ id: user._id, newUserName: userName}))
        setUserName('')
    }

    return (
        <div id="settingspage">
            <button onClick={leaveSettings}>X</button>
            <h1 class="settingtitle">Profile settings</h1>
                {img ? img : "Error could not load the image"}
                <p class="setting">Change Profile Picture</p>
                <>{ loadingPicture ? <Spinner /> :
                    <>
                        <input id='inputfile' type="file" onChange={handleFileInput} ref={fileInput}/>
                        <button onClick={inputFile}>{file ? file.name : "Select a file"}</button>
                        <div className="error">{error ? error : errorPicture ? errorPicture : ''}</div>
                    </>
                }</>
                <button onClick={submitPicture}>Submit</button>
                <div className="success">{successPicture}</div>
            <div className="setting">
                {loadingUserName ? <Spinner/>
                    : <>
                        Current user name: {user.userName}
                        <input type="text" placeholder="Change UserName" className="setting settingtext" onChange={userNameChange}/>
                        <button className="settingsubmit" onClick={submitUserName}>Submit</button>
                        {successUserName ? <div className="success">Successfully changed the username</div> : ''}
                        <div className="error">{errorUserName ? errorUserName : ''}</div>
                    </>
                }
            </div>
            <div class="setting">
                { loadingPlace ? <Spinner />
                    : <>
                        Current place: {user.place}
                        <input type="text" placeholder="Type here your new Place" className="setting settingtext" onChange={placeChange}/>
                        <button class="settingsubmit" onClick={submitPlace}>{place ? "Submit" : "Delete current place"}</button>
                        {successPlace ? <div className="success">Successfully changed the place</div> : ''}
                        <div className="error">{errorPlace ? errorPlace : ''}</div>
                    </>
                }
            </div>
            <div class="setting">
                { loadingBio ? <Spinner />
                    : <>
                        Current bio: {user.bio}
                        <textarea placeholder="Type here your new Bio" class="setting settingtext" onChange={bioChange}/>
                        <button class="settingsubmit" onClick={submitBio}>{bio ? "Submit" : "Delete current bio"}</button>
                        {successBio ? <div className="success">Successfully changed the bio</div> : ''}
                        <div className="error">{errorBio ? errorBio : ''}</div>
                    </>
                }
            </div>
            <div class="setting">
                {   loadingFriends ? <Spinner />
                    : friends.length ?
                        <>
                            <ul id="messagelist">
                                Friends
                                {friends.map(friend => <Friend key={friend._id} user={friend} message={false} delete={true}/>)}
                            </ul>
                            <div className="error">{errorFriends ? errorFriends : ''}</div>
                            <div className="success">{successFriends ? "Successfully updated the friends" : null}</div>
                        </>
                    : "You do not have friends"
                }
            </div>
            <h1 class="settingtitle">Display settings</h1>
                <p class="setting">Dark Mode</p>
        </div>
    );

}


export default SettingsPage;