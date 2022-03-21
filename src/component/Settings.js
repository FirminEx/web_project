import React from "react";
import settings_logo from "../src_logo/settings.png";

class Settings extends React.Component {
    render() {
        return(
            <div id="settings">
                <img class="logo" src={settings_logo} alt="settings logo" />
                Settings
            </div>
        );
    }
}


export default Settings;