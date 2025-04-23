const DataTableSkeleton = () => {
  return (
    <div className="rounded-[var(--cruto-radius)] border border-[var(--cruto-border)]">
      {/* Search bar skeleton */}
      <div className="flex items-center py-4 bg-[var(--cruto-foreground)]">
        <div className="h-10 w-[300px] ml-2 rounded-[var(--cruto-radius)] bg-[var(--cruto-border)] animate-pulse" />
      </div>

      {/* Table header skeleton */}
      <div className="border-t border-[var(--cruto-border)]">
        <div className="flex px-4 py-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-[200px] bg-[var(--cruto-border)] rounded-md animate-pulse mr-8"
            />
          ))}
        </div>
      </div>

      {/* Table rows skeleton */}
      <div className="bg-[var(--cruto-foreground)]">
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="flex items-center px-4 py-4 border-t border-[var(--cruto-border)]"
          >
            {[1, 2, 3].map((cell) => (
              <div
                key={cell}
                className="h-4 w-[200px] bg-[var(--cruto-border)] rounded-md animate-pulse mr-8"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-start px-4 py-4 border-t border-[var(--cruto-border)]">
        <div className="flex gap-2">
          <div className="w-24 h-4 bg-[var(--cruto-border)] rounded-md animate-pulse" />
          <div className="w-24 h-4 d bg-[var(--cruto-border)] rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default DataTableSkeleton;
