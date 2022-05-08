import {useDispatch, useSelector} from "react-redux";
import {searchUserLike} from "../redux/features/searchSlice";
import {imageToBase64} from "../data_process/image";
import React from "react";
import {fetchProfile} from "../redux/features/profileSlice";
import {displaySlice} from "../redux/features/displaySlice";
import Spinner from "./Spinner";

function Search() {
    const dispatch = useDispatch();
    const { searchResults, loading, error } = useSelector(state => state.search)

    const searchInput = (e) => {
        if(e.target.value.length < 3) return
        dispatch(searchUserLike(e.target.value))
    }

    const goToProfile = (id) => {
        dispatch(fetchProfile(id))
        dispatch(displaySlice.actions.goToProfile())
    }

    return(<>
        <input placeholder="search an user" id="searchbar" onChange={searchInput}/>
        {
            searchResults.length ? searchResults.map(user =>
                <div className="result" onClick={() => goToProfile(user.id)}>
                    <img src={imageToBase64(user.picture)} alt={user.name} className="contentprofilepicture"/>
                    @{user.name}
                </div>)
            : loading ?  <Spinner />
            : error ? error : ''
        }
    </>);
}

export default Search