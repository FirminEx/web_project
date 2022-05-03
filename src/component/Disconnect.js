import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from '../redux/features/logiInSlice'
import {fetchPostsDiscover} from "../redux/features/postsSlice";
import {imageToBase64} from "../data_process/image";

function Disconnect() {
    const { user } = useSelector((state) => state.logIn);
    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(logOut())
        dispatch(fetchPostsDiscover())
    }
    let img ="";
    if(user.picture) {
        img = <img className='contentprofilepicture' src={imageToBase64(user.picture)} alt='post media'></img>
    }
    return(
        <div id="disconnect">
            Hello, {user.userName}
            {img ? img : 'Profile picture could not be loaded'}
            <button id="disconnect_button" onClick={onLogOut}>Disconnect</button>
        </div>
    );
}


export default Disconnect;