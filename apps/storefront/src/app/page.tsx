export default function StorefrontPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-900">GPT Store</h1>
      <p className="mt-2 text-gray-600">Discover AI-powered GPT products for your business.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Coming Soon</h2>
          <p className="mt-2 text-sm text-gray-500">Products are being loaded from the catalog.</p>
        </div>
      </div>
    </main>
  );
}
