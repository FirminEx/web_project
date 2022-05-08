import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { register } from '../redux/features/logiInSlice'

function Register() {
    const [credits, setCredits] = useState({})
    const [error, setError] = useState("")
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const dispatch = useDispatch();
    const { errorRegister } = useSelector(state => state.logIn)

    const passwordChange = (event) => {
        setCredits({
            ...credits,
            password: event.target.value
        })
    }
    const passwordConfChange = (event) => {
        setCredits({
            ...credits,
            passwordConf: event.target.value
        })
    }
    const userNameConfChange = (event) => {
        setCredits({
            ...credits,
            userName: event.target.value
        })
    }
    const mailChange = (event) => {
        setCredits({
            ...credits,
            mail: event.target.value
        })
    }


    const formSubmit = (event) => {
        event.preventDefault()
        if(!credits.passwordConf || !credits.password || !credits.mail || !credits.userName) return setError('All fields are required')
        if(credits.userName.length < 3) return setError('Please enter an username with lenght > 3')
        if(!regEmail.test(credits.mail)) return setError('Enter a valid email')
        if(credits.password !== credits.passwordConf) return setError("Passwords don't match")
        dispatch(register(credits))
    }

    return(
        <form id="register">
            <div id="register_title">Register</div>
            <div className="error">{errorRegister ? errorRegister : ""}</div>
            <div className="error">{error ? error : ""}</div>
            <div className="formentrylist">
                <input className="formentry" type="userName" onChange={userNameConfChange} placeholder="user name"/>
                <input className="formentry" type="email" onChange={mailChange} placeholder="account email"/>
                <input className="formentry" type="password" autoComplete="off" onChange={passwordChange} placeholder="password"/>
                <input className="formentry" type="password" autoComplete="off" onChange={passwordConfChange} placeholder="confirm password"/>
            </div>
            <button type="submit" onClick={formSubmit}>Register</button>
        </form>
    );
}


export default Register;