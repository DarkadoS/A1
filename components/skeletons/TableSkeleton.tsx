// components/skeletons/TableSkeleton.tsx
"use client";

export default function TableSkeleton({ columns = 3 }: { columns?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: columns }).map((_, col) => (
        <div key={col} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="h-6 w-28 skeleton rounded mb-4"></div>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-14 skeleton rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
