import React from "react";
import placeholder from "../img/placeholder.jpg"

function Friend(props) {


    return(
        <div class="friend">
            <img className={"friendpp"} src={placeholder} alt="friend" />
            <div class="friendname">{props.name}</div>
        </div>
    );
}


export default Friend;