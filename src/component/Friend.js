import React from "react";
import placeholder from "../img/placeholder.jpg"
import {imageToBase64} from "../data_process/image";
import {useDispatch} from "react-redux";
import {displaySlice} from "../redux/features/displaySlice"

function Friend(props) {
    const dispatch = useDispatch()
    return(
    <div class="friend">
        {props.user.picture ?
            <img src={imageToBase64(props.user.picture)} alt={props.user.userName} className="friendpp"/>
            : <img src={placeholder} alt={props.user.userName} className="friendpp"/>
        }
        <div class="friendname">{props.user.userName}</div>
        <button onClick={() => dispatch(displaySlice.actions.goToConversation())}>Message</button>
    </div>
);
}


export default Friend;