import { ReactNode } from "react";

interface MessageBubbleProps {
  message: string | ReactNode;
  isBot: boolean;
  timestamp?: string;
}

const MessageBubble = ({ message, isBot, timestamp }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div className={`max-w-[80%] md:max-w-[70%]`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isBot
              ? 'bg-chat-bot text-chat-bot-foreground rounded-tl-sm animate-slide-in-left'
              : 'bg-chat-user text-chat-user-foreground rounded-tr-sm animate-slide-in-right'
          }`}
        >
          {typeof message === 'string' ? (
            <p className="text-sm md:text-base leading-relaxed">{message}</p>
          ) : (
            message
          )}
        </div>
        {timestamp && (
          <p className={`text-xs text-muted-foreground mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
