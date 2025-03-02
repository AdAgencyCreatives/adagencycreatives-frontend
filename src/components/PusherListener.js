import { useContext } from "react";
import { useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as CommunityContext } from "../context/CommunityContext";
import { Context as AgenciesContext } from "../context/AgenciesContext";
import Pusher from "pusher-js";
window.Pusher = Pusher;

const PusherListener = () => {
  const {
    state: { token, user },
    notifyConversationUpdated, setCachingNeeded,
  } = useContext(AuthContext);

  const { getReactions } = useContext(CommunityContext);
  const { getStats } = useContext(AgenciesContext);

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
        if (messageType == 'received') {
          // addMessage(data);
          notifyConversationUpdated(data.data);
        } else if (messageType == 'conversation_updated') {
          notifyConversationUpdated(data.data);
        }
        getStats();
      });

      var channelName2 = "community";
      var channel2 = pusher.subscribe(channelName2);
      channel2.bind("post_reaction", function (data) {
        console.log('post_reaction', data);
        getReactions({ post_id: data.data.post_id });
      });

      return () => pusher.unsubscribe(channelName);
    }
  }, [token, user]);

  return <></>;
};

export default PusherListener;
