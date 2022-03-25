import React from "react";
import placeholder from "../img/placeholder.jpg"

class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: props.name, connected: props.connected};
    }

    render() {
        return(
            <div class="friend">
                <img className={"friendpp"} src={placeholder} alt="friend" />
                <div class={"" + (this.state.connected ? "connected" : "offline")}/>
                <div class="friendname">{this.state.name}</div>
            </div>
        );
    }
}


export default Friend;