import {useDispatch, useSelector} from "react-redux";
import {imageToBase64} from "../data_process/image";
import {acceptRequest, fetchRequests} from "../redux/features/friendsSlice";
import React from "react";
import Spinner from "./Spinner";


function FriendRequests() {
    const { requests, loadingRequests } = useSelector((state) => state.friends)
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.logIn)
    console.log(loadingRequests)
    return(
        <ul id='friendrequestslist'>
            {
            loadingRequests ? <Spinner />
            : requests.length ?
                <>
                    <button onClick={() => dispatch(fetchRequests(user))}>Refresh</button>
                    {requests.map(request =>
                    <li className='friendrequest' key={request._id}>
                    {request.picture ? <img src={imageToBase64(request.picture)} alt={request.userName} className="contentprofilepicture"/> : null}
                    {request.userName}
                        <button type="checkbox" onClick={() => dispatch(acceptRequest({user: user._id, target: request._id}))}>Accept</button>
                    </li>)}
                </>
            : user._id ?
                <div>
                    No new friend requests
                    <button onClick={() => dispatch(fetchRequests(user))}>Refresh</button>
                </div>
            : <div>Connect to see friend requests</div>}
        </ul>
    );
}


export default FriendRequests;