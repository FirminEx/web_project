import React from "react";
import placeholder from "../img/placeholder.jpg";

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: this.props.text};
    }

    render() {
        return(
            <div class="content">
                <img className="contentmedia" src={placeholder} alt="placeholder"/>
                {this.state.text}
            </div>
        );
    }
}

//<img class="contentmedia" src={placeholder} alt="placeholder" />

export default Content;


