import React from "react";

function Register() {
    return(
        <form id="register">
            <div id="register_title">Register</div>
            <input type="email" placeholder="account email"/>
            <input type="password" placeholder="password"/>
            <input type="password" placeholder="confirm password"/>
        </form>
    );
}


export default Register;