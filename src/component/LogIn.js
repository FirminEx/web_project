import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {logIn} from "../redux/features/logiInSlice";

function LogIn() {
    const dispatch = useDispatch()
    const [credits, setCredits] = useState({})
    const mailChange = (event) => {
        setCredits({
            ...credits,
            mail: event.target.value
        })
    }
    const passwordChange = (event) => {
        setCredits({
            ...credits,
            password: event.target.value
        })
    }
    const formSubmit = (event) => {
        dispatch(logIn({mail: credits.mail,password: credits.password}))
        event.preventDefault()
    }
    return(
        <form id="login">
            <div id="login_title">Log In</div>
            <input type="email" name="mail" placeholder="account email" onChange={mailChange}/>
            <input type="password" placeholder="password" onChange={passwordChange}/>
            <button type="submit" onClick={formSubmit}>Idk</button>
        </form>
    );
}


export default LogIn;