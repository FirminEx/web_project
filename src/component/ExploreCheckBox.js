import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {displaySlice} from "../redux/features/displaySlice";
import {postsSlice} from "../redux/features/postsSlice";

function ExploreCheckBox() {
    const {display} = useSelector(state => state.display);
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch(postsSlice.actions.reset())
        if(display === 2) dispatch(displaySlice.actions.goToFriendsPosts())
        if(display === 1) dispatch(displaySlice.actions.goToDiscover())
    }

   return(
        <div id="explorecheckbox">
            <button onClick={handleClick}>{display === 2 ? "Go to friends" : "Go to explore"}</button>
        </div>
    );
}


export default ExploreCheckBox;