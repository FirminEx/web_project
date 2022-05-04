import React from "react";
import Trending from "./Trending";
import MessageList from "./MessageList";
import FriendRequests from "./friendRequests";

function NavigationBar() {
    return(
        <div id="navigationbar">
            <Trending />
            <MessageList />
            <FriendRequests />
        </div>
    );
}


export default NavigationBar;