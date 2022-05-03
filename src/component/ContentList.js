import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchPostsDiscover, fetchPostsSubscription, postsSlice} from "../redux/features/postsSlice";
import Content from "./Content";
import Spinner from "./Spinner";

function ContentList() {
    const dispatch = useDispatch();
    const { postsList, loading, error  } = useSelector((state) => state.posts);
    const {display} = useSelector((state) => state.display)
    const {user} = useSelector((state) => state.logIn)
    useEffect(() => {
        if(!postsList.length && (error === '') && display === 2) {
            dispatch(fetchPostsDiscover());
        }
        if(!postsList.length && (error === '') && display === 1) {
            if(user.subscription) dispatch(fetchPostsSubscription(user));
            else dispatch(postsSlice.actions.reset())

        }
    }, [display])

    const retryFetch = () => {
        if(display === 1) {
            return dispatch(fetchPostsSubscription(user));
        }
        dispatch(fetchPostsDiscover());
    }

    return(
        <ul id='contentlist'>{postsList.length ? postsList.map((post) => <Content post={post} key={post._id}/>)
            : loading ? <Spinner />
                : error ? <div>{error}<button onClick={retryFetch}>Try again</button></div>
                    : <div id="noposts">No posts available<button onClick={retryFetch}>Try again</button></div> }</ul>
    )
}

export default ContentList;