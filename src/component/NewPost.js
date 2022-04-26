import React from "react";
import placeholder from "../img/placeholder.jpg"

function NewPost() {
    return(
        <div id="newpost">
            <img src={placeholder} alt="your profile" id="newpostpicture"/>
            <input type="text" placeholder="Write a new post" id="newposttext"/>
            <button id="newpostmedia">Media</button>
        </div>
    );
}


export default NewPost;