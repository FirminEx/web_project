import React from "react";
import Content from "./Content";
import NewPost from "./NewPost";

class ContentPage extends React.Component {
    render() {
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


export default ContentPage;