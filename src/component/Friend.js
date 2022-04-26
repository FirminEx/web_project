import React from "react";
import placeholder from "../img/placeholder.jpg"

function Friend(props) {
    var connected = props.connected
    var name = 'placeholder'
    return(
        <div class="friend">
            <img className={"friendpp"} src={placeholder} alt="friend" />
            <div class={"" + (connected ? "connected" : "offline")}/>
            <div class="friendname">{name}</div>
        </div>
    );
}


export default Friend;