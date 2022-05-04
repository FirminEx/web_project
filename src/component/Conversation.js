import {useSelector} from "react-redux";
import Message from "./Message";
import Spinner from "./Spinner";

function Conversation() {
    const { messageList, loading, friend } = useSelector((state) => state.conversation)

    return <>{
        loading ? <Spinner />
            : messageList.length ?
                <div id="conversation">
                    <div id="friendname">{friend ? friend : ""}</div>
                    <ul id="conversationlist">
                        {messageList.map(message => <Message message={message} key={message._id}/>)}
                    </ul>
                </div>
                : messageList ? <div id="conversation">No messages yet</div>
                : <div id="conversation">Could not load the messages </div>
    }</>


}


export default Conversation;