import React, {useState} from "react";

function Refresh() {
    const [rotate, setRotate] = useState(true)

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={`refreshicon ${rotate ?  "rotate" : null}`} width="24" height="24"
             stroke-width="2.5" stroke="currentColor" fill="none"
             stroke-linecap="round" stroke-linejoin="round" onClick={() => setRotate(true)}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5"></path>
        </svg>
    )

}

export default Refresh