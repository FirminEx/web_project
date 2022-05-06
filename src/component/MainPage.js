import React from "react";
import Control from "./Control";
import ContentPage from "./ContentPage";
import NavigationBar from "./NavigationBar";
import '../stylesheet.css'

function MainPage() {
    return (
        <div id='mainpage'>
            <Control />
            <ContentPage/>
            <NavigationBar />
        </div>
    );

}


export default MainPage;