import React from "react";
import placeholder from "../img/placeholder.jpg"
import {imageToBase64} from "../data_process/image";

function Friend(props) {
        return(
        <div class="friend">
            {props.user.picture ?
                <img src={imageToBase64(props.user.picture)} alt={props.user.userName} className="friendpp"/>
                : <img src={placeholder} alt={props.user.userName} className="friendpp"/>
            }
            <div class="friendname">{props.user.userName}</div>
        </div>
    );
}


export default Friend;