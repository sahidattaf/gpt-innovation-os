export default function AIDashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">AI Dashboard</h1>
      <p className="mt-2 text-gray-400">Monitor AI usage, token spend, and conversation analytics.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Total Tokens Used", value: "0", sub: "This month" },
          { label: "API Cost", value: "$0.00", sub: "Estimated" },
          { label: "Conversations", value: "0", sub: "Total" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.sub}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
