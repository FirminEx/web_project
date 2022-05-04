import React from "react";
import placeholder from "../img/placeholder.jpg"
import {imageToBase64} from "../data_process/image";
import {useDispatch, useSelector} from "react-redux";
import {displaySlice} from "../redux/features/displaySlice"
import {fetchConversation} from "../redux/features/conversationSlice";

function Friend(props) {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.logIn)
    const friendConversation = (e) => {
        e.preventDefault()
        dispatch(fetchConversation({friendID: props.user._id, userID: user._id}))
        dispatch(displaySlice.actions.goToConversation())
    }


    return(
    <div class="friend">
        {props.user.picture ?
            <img src={imageToBase64(props.user.picture)} alt={props.user.userName} className="friendpp"/>
            : <img src={placeholder} alt={props.user.userName} className="friendpp"/>
        }
        <div class="friendname">{props.user.userName}</div>
        <button onClick={friendConversation}>Message</button>
    </div>
);
}


export default Friend;