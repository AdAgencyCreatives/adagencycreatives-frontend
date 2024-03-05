import { useContext } from "react";
import { useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ChatContext } from "../../context/ChatContext";
import Pusher from "pusher-js";
window.Pusher = Pusher;

const ChatListener = () => {
  const {
    state: { token, user },
    notifyConversationUpdated,
  } = useContext(AuthContext);

  const { addMessage } = useContext(ChatContext);

  useEffect(() => {
    if (token) {
      const script = document.createElement("script");
      script.src = "https://js.pusher.com/8.2.0/pusher.min.js";
      script.async = true;
      const channelName = "messanger." + user.uuid;
      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      var pusher = new Pusher("c2125739f0d66b777906", {
        cluster: "mt1",
      });

      var channel = pusher.subscribe(channelName);
      channel.bind("private_msg", function (data) {
        const messageType = data?.data?.message_type;
        if(messageType == 'received') {
          // addMessage(data);
          notifyConversationUpdated(data.data.message);
        } else if(messageType == 'conversation_updated') {
          notifyConversationUpdated(data.data.message);
        }
        
      });

      return () => pusher.unsubscribe(channelName);
    }
  }, [token, user]);

  return <></>;
};

export default ChatListener;
