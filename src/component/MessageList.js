import React from "react";
import Friend from "./Friend";

function MessageList(){
    return(
        <div id="messagelist">
            Friends
            <Friend name="Placeholder" connected={false}/>
            <Friend name="Placeholder" connected={true}/>
            <Friend name="Placeholder" connected={true}/>
            <Friend name="Placeholder" connected={false}/>
        </div>
    );
}


export default MessageList;