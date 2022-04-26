import React from "react";
import LogIn from "./LogIn";
import Register from "./Register";
import Disconnect from "./Disconnect";

function Connexion() {
    var connected = true
    if(connected){
        return(
            <div id="connexion">
                <Disconnect username="Placeholder"/>
            </div>
        );
    }else {
        return(
            <div id="connexion">
                <LogIn />
                <Register />
            </div>
        );
    }
}


export default Connexion;