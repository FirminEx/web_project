import React from "react";
import Connexion from "./Connexion";
import Settings from "./Settings";

function Control() {
    return(
        <div id="control">
            <Connexion connected={true}/>
            <Settings />
        </div>
    );
}


export default Control;