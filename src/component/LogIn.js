import React from "react";

class LogIn extends React.Component {
    render() {
        return(
            <div id="login">
                <div id="login_title">Log In</div>
                <input type="email" placeholder="account email"/>
                <input type="password" placeholder="password"/>
            </div>
        );
    }
}


export default LogIn;