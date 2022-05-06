import React from "react";
import MessageList from "./MessageList";
import FriendRequests from "./FriendRequests";
import Search from './Search'

function NavigationBar() {
    return(
        <div id="navigationbar">
            <Search />
            <MessageList />
            <FriendRequests />
        </div>
    );
}


export default NavigationBar;