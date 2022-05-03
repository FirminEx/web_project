import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {displaySlice} from "../redux/features/displaySlice";
import {postsSlice} from "../redux/features/postsSlice";

function ExploreCheckBox() {
    const {display, logged} = useSelector(state => state.display);
    const [hint, setHint] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if(display === 2) setHint('Explore')
        if(display === 1) setHint('Subscription')
    }, [display])

    const handleClick = (e) => {
        e.preventDefault()
        if(!logged) return setHint('Explore you are not logged in')
        dispatch(postsSlice.actions.reset())
        if(display === 2) dispatch(displaySlice.actions.goToSubscription())
        if(display === 1) dispatch(displaySlice.actions.goToDiscover())
    }

   return(
        <div id="explorecheckbox">
            <input type="checkbox" onChange={handleClick}/>
            <div id="checkboxhint">{hint}</div>
        </div>
    );
}


export default ExploreCheckBox;