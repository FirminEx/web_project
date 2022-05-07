import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../redux/features/logiInSlice";

function LogIn() {
    const dispatch = useDispatch()
    const [credits, setCredits] = useState({})
    const { errorLogIn } = useSelector(state => state.logIn)
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
            <div class="error">{errorLogIn ? errorLogIn : ""}</div>
            <div class="formentrylist">
                <input className="formentry" type="email" name="mail" placeholder="account email" onChange={mailChange}/>
                <input className="formentry" type="password" placeholder="password" onChange={passwordChange} autoComplete="on"/>
            </div>
            <button type="submit" onClick={formSubmit}>Log In</button>
        </form>
    );
}


export default LogIn;