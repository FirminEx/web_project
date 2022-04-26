import React from "react";
import placeholder from "../img/placeholder.jpg";
import likes from "../src_logo/likes.jpg"
import comment from "../src_logo/comment.png"
import share from "../src_logo/share.png"

function Content() {
    var profilename = 'placeholder'
    var text = 'placeholder text'
     return(
        <div class="content">
            <div class="contentprofile">
                <img src={placeholder} class="contentprofilepicture" alt="profile" />
                <div class="contentprofilename">
                    @{profilename}
                </div>
            </div>
            <div class="contenttext">{text}</div>
            <img className="contentmedia" src={placeholder} alt="placeholder"/>
            <ul class="contentinteractionlist">
                <li class="contentinteractionlogo">
                    <img src={likes} alt="like logo" class="contentlogo"/>
                </li>
                <li className="contentinteractionlogo">
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


