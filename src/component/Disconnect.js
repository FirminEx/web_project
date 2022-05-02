import React from "react";
import {useSelector} from "react-redux";

function Disconnect() {
    const { user } = useSelector((state) => state.logIn);
    return(
        <div id="disconnect">
            Hello, {user.userName}
            <button id="disconnect_button">Disconnect</button>
        </div>
    );
}


export default Disconnect;