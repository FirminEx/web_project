import React from "react";
import Friend from "./Friend";
import {useSelector} from "react-redux";

function MessageList(){
    const {user} = useSelector(state => state.logIn)

    return(
        <>{ user.friends ?
            <ul id="messagelist">
                {user.friends.map(friend => {
                    <Friend name=""/>
                })}
                Friends
                <Friend name="Placeholder" connected={false}/>
                <Friend name="Placeholder" connected={true}/>
                <Friend name="Placeholder" connected={true}/>
                <Friend name="Placeholder" connected={false}/>
            </ul>
            : <div id='messagelist'>Connect to see your messages</div>
        }</>
    );
}


export default MessageList;