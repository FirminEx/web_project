import React from "react";

class Register extends React.Component {
    render() {
        return(
            <div id="register">
                <div id="register_title">Register</div>
                <input type="email" placeholder="account email"/>
                <input type="password" placeholder="password"/>
                <input type="password" placeholder="confirm password"/>
            </div>
        );
    }
}


export default Register;