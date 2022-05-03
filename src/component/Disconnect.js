import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from '../redux/features/logiInSlice'
import {fetchPostsDiscover} from "../redux/features/postsSlice";

function Disconnect() {
    const { user } = useSelector((state) => state.logIn);
    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(logOut())
        dispatch(fetchPostsDiscover())
    }

    return(
        <div id="disconnect">
            Hello, {user.userName}
            <button id="disconnect_button" onClick={onLogOut}>Disconnect</button>
        </div>
    );
}


export default Disconnect;