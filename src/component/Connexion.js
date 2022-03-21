import React from "react";
import LogIn from "./LogIn";
import Register from "./Register";
import Disconnect from "./Disconnect";

class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {connected: this.props.connected};
    }

    render() {
        if(this.state.connected){
            return(
                <div id="connexion">
                    <Disconnect username="Placeholder"/>
                </div>
            );
        }else {
            return(
                <div id="connexion">
                    <LogIn />
                    <Register />
                </div>
            );
        }
    }
}


export default Connexion;