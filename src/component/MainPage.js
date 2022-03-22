import React from "react";
import Control from "./Control";
import ContentPage from "./ContentPage";
import NavigationBar from "./NavigationBar";
import '../stylesheet.css'

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {connected: false};
    }

    render() {
        return (
            <div id='mainpage'>
                <Control />
                <ContentPage display="0"/>
                <NavigationBar isConnected={this.state.connected} />
            </div>
        );
    }
}


export default MainPage;