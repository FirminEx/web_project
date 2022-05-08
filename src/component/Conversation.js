import {useDispatch, useSelector} from "react-redux";
import Message from "./Message";
import Spinner from "./Spinner";
import MessageForm from "./MessageForm";
import {displaySlice} from "../redux/features/displaySlice";

function Conversation() {
    const { messageList, loading, friend } = useSelector((state) => state.conversation)
    const dispatch = useDispatch()


    return <div id="conversation">
        <button className="leave" onClick={() => dispatch(displaySlice.actions.goToDiscover())}>X</button>
        {
        loading ? <Spinner />
            : messageList.length ?
                <>
                    <div id="friendname">@{friend ? friend : ""}</div>
                    <ul id="conversationlist" >
                        {messageList.map(message => <Message message={message} key={message._id}/>)}
                    </ul>
                    <MessageForm />
                </>
                : messageList ? <div id="nomessage">No messages yet<MessageForm /></div>
                : <div id="conversation">Could not load the messages </div>
    }</div>


}


export default Conversation;