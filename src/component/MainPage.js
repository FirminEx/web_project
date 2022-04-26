import React from "react";
import Control from "./Control";
import ContentPage from "./ContentPage";
import NavigationBar from "./NavigationBar";
import '../stylesheet.css'

function MainPage() {
    return (
        <div id='mainpage'>
            <Control />
            <ContentPage display="1"/>
            <NavigationBar isConnected={true} />
        </div>
    );

}


export default MainPage;