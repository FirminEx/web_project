import React from "react";
import placeholder from "../img/placeholder.jpg";
import likes from "../src_logo/likes.jpg"
import comment from "../src_logo/comment.png"
import share from "../src_logo/share.png"

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: this.props.text, profilename: this.props.profilename};
    }

    render() {
        return(
            <div class="content">
                <div class="contentprofile">
                    <img src={placeholder} class="contentprofilepicture" alt="profile" />
                    <div class="contentprofilename">
                        @{this.state.profilename}
                    </div>
                </div>
                <div class="contenttext">{this.state.text}</div>
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
}

//<img class="contentmedia" src={placeholder} alt="placeholder" />

export default Content;


