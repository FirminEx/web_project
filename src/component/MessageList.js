import React from "react";
import Friend from "./Friend";
import {useDispatch, useSelector} from "react-redux";
import {fetchFriends} from "../redux/features/friendsSlice";
import Spinner from "./Spinner";
import Refresh from "./Refresh";

function MessageList(){
    const { friends, loadingFriends } = useSelector(state => state.friends)
    const { logged } = useSelector(state => state.display)
    const { user } = useSelector(state => state.logIn)
    const dispatch = useDispatch()


    return(
        <>
        {
            loadingFriends ? <Spinner />
            : friends.length ?
                <ul id="messagelist">
                    Friends
                    {friends.map(friend => <Friend className="friendmessage" key={friend._id} user={friend} message={true} delete={false}/>)}
                    <button className="refresh" onClick={() => dispatch(fetchFriends(user))}>
                        <Refresh />
                    </button>
                </ul>
            : logged ?
                <>
                    <div id='messagelist'>
                        <div id="nofriends">No friends :(</div>
                        <button className="refresh" onClick={() => dispatch(fetchFriends(user))}>
                            <Refresh />
                        </button>
                    </div>
                </>
            : <div id='messagelist'>Connect to see your messages</div>
        }</>
    );
}


export default MessageList;