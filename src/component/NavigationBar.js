import React from "react";
import Trending from "./Trending";
import MessageList from "./MessageList";

class NavigationBar extends React.Component {
    render() {
        return(
            <div id="navigationbar">
                <Trending />
                <MessageList />
            </div>
        );
    }
}


export default NavigationBar;