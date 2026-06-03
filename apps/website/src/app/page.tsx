export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900">GPT Innovation OS</h1>
      <p className="mt-4 text-xl text-gray-600">The AI operating system for entrepreneurs.</p>
      <div className="mt-8 flex gap-4">
        <a
          href="/storefront"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Browse GPTs
        </a>
        <a
          href="/command-center"
          className="rounded-lg border border-gray-300 px-6 py-3 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
        >
          Command Center
        </a>
      </div>
    </main>
  );
}
