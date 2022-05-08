import React from "react";
import {displaySlice} from "../redux/features/displaySlice";
import {useDispatch} from "react-redux";

function Settings() {
    const dispatch = useDispatch()

    return(
        <div id="settings" onClick={() => dispatch(displaySlice.actions.goToSettings())}>
            Settings
        </div>
    );

}


export default Settings;