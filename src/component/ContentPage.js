import React from "react";
import Content from "./Content";
import NewPost from "./NewPost";
import SettingsPage from "./SettingsPage";
import ExploreCheckBox from "./ExploreCheckBox";
import ContentList from "./ContentList";

function ContentPage() {
    var display = 1
    switch (display){
        case 0:
            return(
              <SettingsPage />
            );
        case 1:
            return(
                <ul id="contentpage">
                    <NewPost />
                    <ExploreCheckBox explore={true} hint="Explore"/>
                    <ContentList />
                </ul>
            );

        default:
            return(
                <ul id="contentpage">
                    <NewPost />
                    <ExploreCheckBox explore={false} hint="Subscription"/>
                    <Content text="placeholder content" profilename="placeholder"/>
                    <Content text="placeholder content" profilename="placeholder"/>
                    <Content text="placeholder content" profilename="placeholder"/>
                    <Content text="placeholder content" profilename="placeholder"/>
                </ul>
            );

    }
}


export default ContentPage;