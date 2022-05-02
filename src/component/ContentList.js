import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchAllPosts} from "../redux/features/postsSlice";
import Content from "./Content";
import Spinner from "./Spinner";

function ContentList() {
    const dispatch = useDispatch();
    const { postsList, loading, error  } = useSelector((state) => state.posts);
    useEffect(() => {
        if(!postsList.length && (error === '')) {
            dispatch(fetchAllPosts());
        }
    }, [])
    return(
        <ul>{postsList.length ? postsList.map((post) => <Content post={post} key={post._id}/>)
            : loading ? <Spinner />
                : error ? <div>{error}<button onClick={() => dispatch(fetchAllPosts())}>Try again</button></div>
                    : <div id="noposts">No posts available<button onClick={() => dispatch(fetchAllPosts())}>Try again</button></div> }</ul>
    )
}

export default ContentList;