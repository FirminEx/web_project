import React from "react";
import Connexion from "./Connexion";
import Settings from "./Settings";

class Control extends React.Component {
    render() {
        return(
            <div id="control">
                <Connexion connected={true}/>
                <Settings />
            </div>
        );
    }
}


export default Control;