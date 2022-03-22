import React from "react";
import Content from "./Content";
import NewPost from "./NewPost";
import SettingsPage from "./SettingsPage";

class ContentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {display: parseInt(this.props.display, 10)};
    }

    render() {
        switch (this.state.display){
            case 0:
                return(
                  <SettingsPage />
                );
            default:
                return(
                    <ul id="contentpage">
                        <NewPost />
                        <Content text="placeholder content"/>
                        <Content text="placeholder content"/>
                        <Content text="placeholder content"/>
                        <Content text="placeholder content"/>
                    </ul>
                );
        }
    }
}


export default ContentPage;