import React from "react";
import NewPost from "./NewPost";
import SettingsPage from "./SettingsPage";
import ExploreCheckBox from "./ExploreCheckBox";
import ContentList from "./ContentList";
import {useSelector} from "react-redux";
import Conversation from "./Conversation";
import Profile from "./Profile";

function ContentPage() {
    const {display} = useSelector(state => state.display)
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

        case 2: //not connected
            return(
                <ul id="contentpage">
                    <NewPost />
                    <ExploreCheckBox/>
                    <ContentList />
                </ul>
            );

        case 3:
            return(
                <Conversation />
            );
        case 4:
            return(
                <Profile />
            );
        default:
            return(<div>Display error</div>)

    }
}


export default ContentPage;