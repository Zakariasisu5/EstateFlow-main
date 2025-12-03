const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-chat-bot text-chat-bot-foreground rounded-2xl rounded-tl-sm w-fit animate-slide-in-left">
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '200ms' }} />
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '400ms' }} />
    </div>
  );
};

export default TypingIndicator;
