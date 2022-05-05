import React from "react";
import Connexion from "./Connexion";
import Settings from "./Settings";
import {useSelector} from "react-redux";

function Control() {
    const { logged } = useSelector(state => state.display)

    return(
        <div id="control">
            <Connexion />
            {logged ? <Settings /> : ''}
        </div>
    );
}


export default Control;