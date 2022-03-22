import React from "react";
import '../stylesheet.css'

class SettingsPage extends React.Component {
    render() {
        return (
            <div id="settingspage">
                <h1>Profile settings</h1>
                    <p>Change Profile Picture</p>
                    <p>Change Bio</p>
                    <p>Change Change Link</p>
                <h1>Display settings</h1>
                    <p>Dark Mode</p>
                <h1>Privacy settings</h1>
                    <p>Change profile visibility</p>
                    <p>Allow everyone to message me</p>
            </div>
        );
    }
}


export default SettingsPage;