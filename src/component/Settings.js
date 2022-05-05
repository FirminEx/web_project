import React from "react";
import settings_logo from "../src_logo/settings.png";
import {displaySlice} from "../redux/features/displaySlice";
import {useDispatch} from "react-redux";

function Settings() {
    const dispatch = useDispatch()

    return(
        <div id="settings" onClick={() => dispatch(displaySlice.actions.goToSettings())}>
            <img class="logo" src={settings_logo} alt="settings logo" />
            Settings
        </div>
    );

}


export default Settings;