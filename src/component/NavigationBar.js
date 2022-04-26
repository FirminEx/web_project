import React from "react";
import Trending from "./Trending";
import MessageList from "./MessageList";

function NavigationBar() {
    return(
        <div id="navigationbar">
            <Trending />
            <MessageList />
        </div>
    );
}


export default NavigationBar;