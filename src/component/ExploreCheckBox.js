import React from "react";

function ExploreCheckBox() {
    var explore = true;
    var hint = "Explore"
    const handleClick = () => {
        if(explore) {
            explore = false;
            hint = "Subscription";
        }else {
            explore = true;
            hint = "Explore";
        }
    }

    return(
        <div id="explorecheckbox">
            <input type="checkbox" onChange={handleClick}/>
            <div id="checkboxhint">{hint}</div>
        </div>
    );
}


export default ExploreCheckBox;