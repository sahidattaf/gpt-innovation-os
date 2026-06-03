export default function ChatWidgetPage() {
  return (
    <main className="flex h-screen flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <h1 className="text-sm font-semibold text-gray-900">GPT Innovation OS — AI Assistant</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="rounded-lg bg-blue-600 px-4 py-3 text-sm text-white max-w-xs">
            Hi! I am your AI assistant. How can I help you today?
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="mx-auto max-w-2xl flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white font-medium hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
