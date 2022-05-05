import React from "react";
import placeholder from "../img/placeholder.jpg"
import {imageToBase64} from "../data_process/image";
import {useDispatch, useSelector} from "react-redux";
import {displaySlice} from "../redux/features/displaySlice"
import {fetchConversation} from "../redux/features/conversationSlice";
import {fetchProfile} from "../redux/features/profileSlice";
import {updateFriend} from "../redux/features/settingsSlice";

function Friend(props) {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.logIn)
    const friendConversation = (e) => {
        e.preventDefault()
        dispatch(fetchConversation({friendID: props.user._id, userID: user._id}))
        dispatch(displaySlice.actions.goToConversation())
    }

    const goToProfile = (e) => {
        e.preventDefault();
        dispatch(fetchProfile(user._id))
        dispatch(displaySlice.actions.goToProfile())
    }

    const deleteFriend = (e) => {
        e.preventDefault();
        dispatch(updateFriend({user: user, target: props.user._id}))
    }


    return(
    <div class="friend">
        {
            props.user.picture ?
            <img src={imageToBase64(props.user.picture)} alt={props.user.userName} className="friendpp" onClick={goToProfile}/>
            : <img src={placeholder} alt={props.user.userName} className="friendpp"/>
        }
        <div class="friendname">{props.user.userName}</div>
        {props.message ? <button onClick={friendConversation}>Message</button> : null}
        {props.delete ? <button onClick={deleteFriend}>Delete</button> : null}
    </div>
    );
}


export default Friend;