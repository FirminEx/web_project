import React from "react";
import '../stylesheet.css'

function SettingsPage() {
    return (
        <div id="settingspage">
            <h1 class="settingtitle">Profile settings</h1>
                <p class="setting">Change Profile Picture</p>
            <div class="setting">
                <input type="text" id="settingbio" placeholder="Change Link" className="setting settingtext"/>
                <button class="settingsubmit">Submit</button>
            </div>
            <div class="setting">
                <textarea placeholder="Change Bio" class="setting settingtext"/>
                <button class="settingsubmit">Submit</button>
            </div>
            <h1 class="settingtitle">Display settings</h1>
                <p class="setting">Dark Mode</p>
            <h1 class="settingtitle">Privacy settings</h1>
                <p class="setting">Change profile visibility</p>
                <p class="setting">Allow everyone to message me</p>
        </div>
    );

}


export default SettingsPage;