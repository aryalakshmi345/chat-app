const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => {
        const alignment = idx % 2 === 0 ? "chat-start" : "chat-end";

        return (
          <div key={idx} className={`chat ${alignment}`}>
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
            </div>
            <div className="chat-header">
              <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="chat-bubble bg-gray-300 w-[200px] h-5 animate-pulse" />
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
