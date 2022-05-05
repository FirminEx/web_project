import React from "react";
import Friend from "./Friend";
import {useDispatch, useSelector} from "react-redux";
import {fetchFriends} from "../redux/features/friendsSlice";
import Spinner from "./Spinner";

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
                    {friends.map(friend => <Friend key={friend._id} user={friend} message={true} delete={false}/>)}
                    <button onClick={() => dispatch(fetchFriends(user))}>Refresh</button>
                </ul>
            : logged ?
                <>
                    <div id='messagelist'>
                        No friends :(
                        <button onClick={() => dispatch(fetchFriends(user))}>Refresh</button>
                    </div>
                </>
            : <div id='messagelist'>Connect to see your messages</div>
        }</>
    );
}


export default MessageList;