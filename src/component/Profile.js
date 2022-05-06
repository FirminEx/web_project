import {useDispatch, useSelector} from "react-redux";
import Spinner from "./Spinner";
import {imageToBase64} from "../data_process/image";
import React from "react";
import Friend from "./Friend";
import Content from "./Content";
import {fetchPostsProfile, sendFriendRequest} from "../redux/features/profileSlice";

function Profile() {
    const { profile, loading, error, friends, friendsLoading, friendsError, posts, postsLoading, postsError, requestLoading, requestSuccess, requestError } = useSelector(state => state.profile)
    const { userName, date, picture, place, bio } = profile
    const { user } = useSelector(state => state.logIn)
    const { logged } = useSelector(state => state.display)
    const dispatch = useDispatch()

    let img ="";
    if(picture) {
        img = <img className='contentprofilepicture' src={imageToBase64(picture)} alt='post media'></img>
    }

    return (<>{
        loading ? <div id='profile'><Spinner /></div>
        : error ? <div className='error'>error</div>
        : <div id='profile'>
            {img ? img : 'Profile picture could not be loaded'}
            <div>
                {userName}
                {
                    user._id === profile._id ? "(You)"
                    : requestLoading ? <Spinner />
                    : requestSuccess ? <div className="success">Request sent</div>
                    : requestError ? <div className="error">{requestError}</div>
                    : logged ? <button onClick={() => dispatch(sendFriendRequest({ id: user._id, target: profile._id}))}>Add as friend</button>
                    : null
                }
            </div>
            <div>{bio ? bio : 'No bio'}</div>
            <div>{place ? 'Currently in ' + place : 'No place'}</div>
            Member since : {date.slice(0, 10)}
            {
                friends.length ?
                <ul id="messagelist">
                    Friends
                    {friends.map(friend => <Friend key={friend._id} user={friend} message={false} delete={false}/>)}
                </ul>
                : friendsLoading ? <Spinner />
                : friendsError ? <div>{friendsError}</div>
                : <div>This user does not have friends</div>
            }
            <ul id='contentlist'>{posts.length ? posts.map((post) => <Content post={post} key={post._id}/>)
                : postsLoading ? <Spinner />
                : postsError ? <div>{error}<button onClick={() => dispatch(fetchPostsProfile(profile))}>Try again</button></div>
                : <div id="noposts">This user does not have posts<button onClick={() => dispatch(fetchPostsProfile(profile))}>Try again</button></div> }
            </ul>
         </div>
    }</>)
}



export default Profile