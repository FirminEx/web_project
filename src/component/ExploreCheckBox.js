import React from "react";

class ExploreCheckBox extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {explore: this.props.explore, hint: this.props.hint};
    }

    handleClick = () => {
        if(this.state.explore) {
            this.setState({explore: false, hint: "Subscription"});
        }else {
            this.setState({explore: true, hint: "Explore"});
        }
    }

    render() {
        return(
            <div id="explorecheckbox">
                <input type="checkbox" onChange={this.handleClick}/>
                <div id="checkboxhint">{this.state.hint}</div>
            </div>
        );
    }
}


export default ExploreCheckBox;