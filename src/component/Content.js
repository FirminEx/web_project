import React from "react";
import placeholder from "../img/placeholder.jpg";
import likes from "../src_logo/likes.jpg"
import comment from "../src_logo/comment.png"
import share from "../src_logo/share.png"

function Content(props) {
    let img = "";
    if(props.post.media) {
        var binary = '';
        var bytes = new Uint8Array( props.post.media.data.data );
        for (var i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode( bytes[ i ] ); //convert back to base64
        }
        const base64 = window.btoa( binary );
        const src = "data:" + props.post.media.type + ";base64," + base64
        img = <img className='contentmedia' src={src} alt='post media'></img>
    }
    const date = new Date(props.post.date)
     return(
        <div class="content">
            <div class="contentheader">
                <div className="contentprofile">
                    <img src={placeholder} class="contentprofilepicture" alt="profile" />
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
                    {props.post.likers.length}
                    <img src={likes} alt="like logo" class="contentlogo"/>
                </li>
                <li className="contentinteractionlogo">
                    {props.post.comments.length}
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


