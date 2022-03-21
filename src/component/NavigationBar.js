import React from "react";
import Trending from "./Trending";

class NavigationBar extends React.Component {
    render() {
        return(
            <div id="navigationbar">
                <Trending />
            </div>
        );
    }
}


export default NavigationBar;