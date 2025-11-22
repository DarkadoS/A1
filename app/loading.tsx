// app/loading.tsx
export default function LoadingPage() {
  return (
    <main className="p-6 min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="h-8 w-48 skeleton rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="h-6 w-28 skeleton rounded mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="h-14 skeleton rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
