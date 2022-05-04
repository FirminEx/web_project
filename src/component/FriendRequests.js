import {useSelector} from "react-redux";
import {imageToBase64} from "../data_process/image";
import React from "react";


function FriendRequests() {
    const {requests} = useSelector((state) => state.friends)

    return(
        <ul id='friendrequestslist'>{requests.length ? requests.map(request => <li className='friendrequest' key={request._id}>
                {request.picture ? <img src={imageToBase64(request.picture)} alt={request.userName} className="contentprofilepicture"/> : null}
                {request.userName}
                <input type="checkbox" />Accept
                </li>)
            : <div>Connect to see friend requests</div>}</ul>
    );
}


export default FriendRequests;