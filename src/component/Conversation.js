import {useDispatch, useSelector} from "react-redux";
import Message from "./Message";
import Spinner from "./Spinner";
import MessageForm from "./MessageForm";
import {displaySlice} from "../redux/features/displaySlice";

function Conversation() {
    const { messageList, loading, friend } = useSelector((state) => state.conversation)
    const dispatch = useDispatch()

    return <>
        <button onClick={() => dispatch(displaySlice.actions.goToDiscover())}>Back to main</button>
        {
        loading ? <Spinner />
            : messageList.length ?
                <div id="conversation">
                    <div id="friendname">{friend ? friend : ""}</div>
                    <ul id="conversationlist">
                        {messageList.map(message => <Message message={message} key={message._id}/>)}
                    </ul>
                    <MessageForm />
                </div>
                : messageList ? <div id="conversation">No messages yet<MessageForm /></div>
                : <div id="conversation">Could not load the messages </div>
    }</>


}


export default Conversation;