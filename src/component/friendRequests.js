import {useSelector} from "react-redux";


function FriendRequests() {
    const {user} = useSelector((state) => state.logIn)

    return(
        <ul id='friendRequests'>{user.friendRequests ? user.friendRequests.map(request => <li>placeholder</li>)
            : <div>Connect to see friend requests</div>}</ul>
    );
}


export default FriendRequests;