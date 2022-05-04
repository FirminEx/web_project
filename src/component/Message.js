import {useSelector} from "react-redux";
import {imageToBase64} from "../data_process/image";
import React from "react";

function Message(props) {
    const user = useSelector(state => state.logIn)
    let img = null;
    if(props.message.media) {
        img = <img className='contentmedia' src={imageToBase64(props.message.media)} alt='post media'></img>
    }
    return <>{
        user._id === props.message.sender ? <div className="messagesent">
            {props.message.text ? props.message.text : ''}
            {img}
            </div>
        : <div className="messagereceived">
            {props.message.text ? props.message.text : ''}
            {img}
        </div>

    }</>
}

export default Message