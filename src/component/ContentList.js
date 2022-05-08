import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {
    fetchAllId,
    fetchPostsDiscover,
    fetchPostsFriends, lazyFetchPostsDiscover,
    postsSlice
} from "../redux/features/postsSlice";
import Content from "./Content";
import Spinner from "./Spinner";
import Refresh from "./Refresh";

function ContentList() {
    const dispatch = useDispatch();
    const { postsList, loading, error, idFetched, postIdList, pageList, errorLazy, lazyLoading } = useSelector((state) => state.posts);
    const {display} = useSelector((state) => state.display)
    const {user} = useSelector((state) => state.logIn)

    useEffect(  async () => {
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

    const onScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            dispatch(lazyFetchPostsDiscover(postIdList))
        }
    }

    return(
        <>{
        pageList.length && display === 2 ?
            <ul id="contentlist" >
                {pageList.map(page => page.map(post => <Content post={post} key={post._id}/>))}
                {errorLazy ? <div id="endpostlist">{errorLazy}<button className="refresh" onClick={() => dispatch(lazyFetchPostsDiscover(postIdList))}><Refresh /></button></div> : ''}
                { lazyLoading ? <Spinner/> : ''}
            </ul>
        : lazyLoading ? <Spinner />
        : postsList.length ?
            <ul id='contentlist' onScroll={onScroll}>{postsList.length ? postsList.map((post) => <Content post={post} key={post._id}/>)
                : loading ? <Spinner />
                    : error ? <div>{error}<button onClick={retryFetch}>Try again</button></div>
                        : <div id="endpostlist">No posts available<button onClick={retryFetch} className="refresh"><Refresh /></button></div> }</ul>
        : errorLazy ? <div>{errorLazy}</div>
        : <div>No posts available</div>
        }</>
    )
}

export default ContentList;