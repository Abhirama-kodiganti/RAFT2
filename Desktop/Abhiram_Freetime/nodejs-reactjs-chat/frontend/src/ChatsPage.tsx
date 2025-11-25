import React, { useEffect, useState } from "react";
import type { Channel as StreamChannel } from "stream-chat";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
  LoadingIndicator
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";

type ChatsPageProps = {
  user?: {
    apiKey?: string;
    token?: string;
    username: string;
  };
};

type ClientState = {
  chatClient: StreamChat;
  channel: StreamChannel;
};

function ChatsPage({ user }: ChatsPageProps) {
  const [client, setClient] = useState<ClientState | null>(null);

  useEffect(() => {
    let mounted = true;
    let chatClient: StreamChat | null = null;

    const connect = async () => {
      try {
        if (!user?.apiKey || !user?.token || !user?.username) {
          throw new Error("Missing apiKey, token, or username");
        }

        chatClient = StreamChat.getInstance(user.apiKey);

        await chatClient.connectUser(
          { id: user.username, name: user.username },
          user.token
        );

        const channel = chatClient.channel("messaging", "global-chat");

        await channel.watch();

        if (mounted && chatClient) {
          setClient({ chatClient, channel });
        }
      } catch (err) {
        console.error("Stream connect error:", err);
      }
    };

    connect();

    return () => {
      mounted = false;
      if (chatClient) {
        chatClient.disconnectUser().catch(() => {});
      }
    };
  }, [user]);

  if (!client) return <LoadingIndicator />;

  return (
    <Chat client={client.chatClient} theme="str-chat__theme-light">
      <Channel channel={client.channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}

export default ChatsPage;
