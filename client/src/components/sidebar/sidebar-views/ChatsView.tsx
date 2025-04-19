import ChatInput from "@/components/chats/ChatInput";
import ChatList from "@/components/chats/ChatList";
import useResponsive from "@/hooks/useResponsive";

const ChatsView = () => {
    const { viewHeight } = useResponsive();

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col gap-4 p-6 bg-gray-900 text-white rounded-lg shadow-lg"
            style={{ height: viewHeight }}
        >
            <h1 className="text-xl font-bold text-center border-b border-gray-700 pb-2">Group Chat</h1>
            <div className="flex-1 overflow-y-auto bg-gray-800 p-3 rounded-lg shadow-inner">
                {/* Chat list */}
                <ChatList />
            </div>
            <div className="bg-gray-800 p-3 rounded-lg shadow-md">
                {/* Chat input */}
                <ChatInput />
            </div>
        </div>
    );
};

export default ChatsView;
