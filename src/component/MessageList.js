import React from "react";
import Friend from "./Friend";
import {useSelector} from "react-redux";

function MessageList(){
    const {friends} = useSelector(state => state.friends)
    const {logged} = useSelector(state => state.display)
    return(
        <>
        {friends.length ?
            <ul id="messagelist">
                Friends
                {friends.map(friend => <Friend key={friend._id} user={friend} message={true}/>)}
            </ul>
            : logged ?
                <div id='messagelist'>No friends :(</div>
            : <div id='messagelist'>Connect to see your messages</div>
        }</>
    );
}


export default MessageList;