export default function CommandCenterPage() {
  return (
    <main className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Command Center</h1>
        <p className="text-gray-500">Manage your GPT products, clients, and revenue.</p>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Revenue", value: "$0", sub: "This month" },
          { label: "Active Users", value: "0", sub: "Total" },
          { label: "GPT Products", value: "0", sub: "Published" },
          { label: "Conversations", value: "0", sub: "Today" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.sub}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
