import React from "react";
import {imageToBase64} from "../data_process/image";
import placeholder from "../img/placeholder.jpg";
import {fetchProfile} from "../redux/features/profileSlice";
import {displaySlice} from "../redux/features/displaySlice";
import {useDispatch} from "react-redux";

function Content(props) {
    let img = "";
    const dispatch = useDispatch()
    if(props.post.media) {
        img = <img className='contentmedia' src={imageToBase64(props.post.media)} alt='post media'></img>
    }
    const goToProfile = () => {
        dispatch(fetchProfile(props.post.authorID))
        dispatch(displaySlice.actions.goToProfile())
    }
    const date = new Date(props.post.date)
     return(
        <div class="content">
            <div class="contentheader">
                <div className="contentprofile">
                    {props.post.authorPicture ?  <img src={imageToBase64(props.post.authorPicture)} alt={props.post.author} className="friendpp" onClick={goToProfile}/>
                        : <img src={placeholder} alt={props.post.author} className="friendpp" onClick={goToProfile}/> }
                    <div class="contentprofilename">
                        @{props.post.author}
                    </div>
                </div>
                <div className="contentdate">
                    {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                </div>
            </div>
            <div class="contenttext">{props.post.text}</div>
            {img ? img : ""}
            <ul class="contentinteractionlist">

            </ul>
        </div>
    );

}


export default Content;


