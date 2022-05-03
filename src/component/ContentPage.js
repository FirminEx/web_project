import React from "react";
import NewPost from "./NewPost";
import SettingsPage from "./SettingsPage";
import ExploreCheckBox from "./ExploreCheckBox";
import ContentList from "./ContentList";
import {useSelector} from "react-redux";

function ContentPage() {
    var {display} = useSelector(state => state.display.display)
    switch (display){
        case 0:
            return(
              <SettingsPage />
            );
        case 1:
            return(
                <ul id="contentpage">
                    <NewPost />
                    <ExploreCheckBox/>
                    <ContentList />
                </ul>
            );

        default: //not connected
            return(
                <ul id="contentpage">
                    <NewPost />
                    <ExploreCheckBox/>
                    <ContentList />
                </ul>
            );

    }
}


export default ContentPage;