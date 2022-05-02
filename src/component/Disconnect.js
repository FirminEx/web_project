import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logInSlice} from '../redux/features/logiInSlice'

function Disconnect() {
    const { user } = useSelector((state) => state.logIn);
    const dispatch = useDispatch();
    return(
        <div id="disconnect">
            Hello, {user.userName}
            <button id="disconnect_button" onClick={() => dispatch(logInSlice.actions.logOut())}>Disconnect</button>
        </div>
    );
}


export default Disconnect;