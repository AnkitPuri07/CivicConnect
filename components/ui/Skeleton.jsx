"use client";

export function SkeletonCard() {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="h-6 w-3/4 bg-slate-200 dark:bg-zinc-700 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-slate-200 dark:bg-zinc-700 rounded animate-pulse" />
        </div>
        <div className="h-6 w-20 bg-slate-200 dark:bg-zinc-700 rounded-full animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-200 dark:bg-zinc-700 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-slate-200 dark:bg-zinc-700 rounded animate-pulse" />
      </div>
      <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-zinc-700">
        <div className="h-8 w-16 bg-slate-200 dark:bg-zinc-700 rounded animate-pulse" />
        <div className="h-8 w-16 bg-slate-200 dark:bg-zinc-700 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
