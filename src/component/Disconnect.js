import React from "react";

class Disconnect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: this.props.username};
    }

    render() {
        return(
            <div id="disconnect">
                Hello, {this.state.username}
                <button id="disconnect_button">Disconnect</button>
            </div>
        );
    }
}


export default Disconnect;