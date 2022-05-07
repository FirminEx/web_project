import React from "react";
import LogIn from "./LogIn";
import Register from "./Register";
import Disconnect from "./Disconnect";
import Spinner from "./Spinner";
import {useSelector} from "react-redux";

function Connexion() {
    const { user, connected, loading, errorLogIn, errorRegister  } = useSelector((state) => state.logIn);
    return(
        <>{connected ? <Disconnect username={user.userName} id="connexion"/>
            : loading ? <Spinner id="connexion"/>
                : errorLogIn || errorRegister ? <div id="connexion"><LogIn /><Register /></div>
                : <div id="connexion"><LogIn /><Register /></div>}
            </>
    );
}


export default Connexion;