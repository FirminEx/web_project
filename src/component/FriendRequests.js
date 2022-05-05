import {useDispatch, useSelector} from "react-redux";
import {imageToBase64} from "../data_process/image";
import {acceptRequest} from "../redux/features/friendsSlice";
import React from "react";


function FriendRequests() {
    const { requests } = useSelector((state) => state.friends)
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.logIn)

    return(
        <ul id='friendrequestslist'>
            {requests.length ? requests.map(request =>
                <li className='friendrequest' key={request._id}>
                {request.picture ? <img src={imageToBase64(request.picture)} alt={request.userName} className="contentprofilepicture"/> : null}
                {request.userName}
                <input type="checkbox" onClick={() => dispatch(acceptRequest({user: user._id, target: request._id}))}/>Accept
                </li>)
            : user._id ? <div>No new friend requests </div>
            : <div>Connect to see friend requests</div>}</ul>
    );
}


export default FriendRequests;