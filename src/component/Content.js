import React from "react";
import likes from "../src_logo/likes.jpg"
import comment from "../src_logo/comment.png"
import share from "../src_logo/share.png"
import {imageToBase64} from "../data_process/image";
import placeholder from "../img/placeholder.jpg";

function Content(props) {
    let img = "";
    if(props.post.media) {
        img = <img className='contentmedia' src={imageToBase64(props.post.media)} alt='post media'></img>
    }
    const date = new Date(props.post.date)
     return(
        <div class="content">
            <div class="contentheader">
                <div className="contentprofile">
                    {props.post.authorPicture ?  <img src={imageToBase64(props.post.authorPicture)} alt={props.post.author} className="friendpp"/>
                        : <img src={placeholder} alt={props.post.author} className="friendpp"/> }
                    <div class="contentprofilename">
                        @{props.post.author}
                    </div>
                </div>
                <div className="contentdate">
                    {date.getDay()}/{date.getMonth()}/{date.getFullYear()}
                </div>
            </div>
            <div class="contenttext">{props.post.text}</div>
            {img ? img : ""}
            <ul class="contentinteractionlist">
                <li class="contentinteractionlogo">
                    {props.post.likers ? props.post.likers.length : 0}
                    <img src={likes} alt="like logo" class="contentlogo"/>
                </li>
                <li className="contentinteractionlogo">
                    {props.post.comments ?  props.post.comments.length : 0}
                    <img src={comment} alt="comment logo" className="contentlogo"/>
                </li>
                <li className="contentinteractionlogo">
                    <img src={share} alt="share logo" className="contentlogo"/>
                </li>
            </ul>
        </div>
    );

}


export default Content;


