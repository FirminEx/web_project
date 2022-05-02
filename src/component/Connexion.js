import React from "react";
import LogIn from "./LogIn";
import Register from "./Register";
import Disconnect from "./Disconnect";
import Spinner from "./Spinner";
import logIn from "./LogIn";
import {useDispatch, useSelector} from "react-redux";

function Connexion() {
    const { user, connected, loading, error  } = useSelector((state) => state.logIn);
    const dispatch = useDispatch();
    return(
        <>{connected ? <Disconnect username={user.userName}/>
            : loading ? <Spinner />
                : error ? <div>{error}<button onClick={() => dispatch(logIn())}>Try again</button></div>
                : <div id="connexion"><LogIn /><Register /></div>}
            </>
    );
}


export default Connexion;