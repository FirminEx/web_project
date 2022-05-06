import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef} from "react";
import {
    fetchAllId,
    fetchPostsDiscover,
    fetchPostsFriends, lazyFetchPostsDiscover,
    postsSlice
} from "../redux/features/postsSlice";
import Content from "./Content";
import Spinner from "./Spinner";

function ContentList() {
    const dispatch = useDispatch();
    const { postsList, loading, error, idFetched, postIdList } = useSelector((state) => state.posts);
    const {display} = useSelector((state) => state.display)
    const {user} = useSelector((state) => state.logIn)

    const listInnerRef = useRef();

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                console.log("reached bottom");
            }
        }
    };

    useEffect(  () => {
        if(!(postIdList.length) && !(idFetched)) dispatch(fetchAllId())
        if (!postsList.length && (error === '') && display === 2 && postIdList.length) {
           dispatch(lazyFetchPostsDiscover(postIdList))
        }
        if (!postsList.length && (error === '') && display === 1) {
            if (user.friends) dispatch(fetchPostsFriends(user));
            else dispatch(postsSlice.actions.reset())

        }
    }, [display, postIdList])

    const retryFetch = () => {
        if(display === 1) {
            return dispatch(fetchPostsFriends(user));
        }
        dispatch(fetchPostsDiscover());
    }

    return(
        <ul id='contentlist' onScroll={onScroll}>{postsList.length ? postsList.map((post) => <Content post={post} key={post._id}/>)
            : loading ? <Spinner />
                : error ? <div>{error}<button onClick={retryFetch}>Try again</button></div>
                    : <div id="noposts">No posts available<button onClick={retryFetch}>Try again</button></div> }</ul>
    )
}

export default ContentList;