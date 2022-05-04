import {useSelector} from "react-redux";
import Message from "./Message";

function Conversation() {
    const { messageList } = useSelector((state) => state.conversation)
    return <>{
        messageList.length ?
            <div id="conversation">
                <ul>
                    {messageList.map(message => <Message message={message} key={message._id}/>)}
                </ul>
            </div>
            : messageList ? <div id='conversation'>No messages yet</div>
            : <div id='conversation'>Could not load the messages</div>

    }</>

}


export default Conversation;