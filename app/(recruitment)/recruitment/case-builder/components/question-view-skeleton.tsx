interface QuestionViewSkeletonProps {
  // Add any necessary props for the skeleton loader
}

export function QuestionViewSkeleton({}: QuestionViewSkeletonProps) {
  return (
    <div className="flex gap-2 ">
      <div className="flex flex-col items-center h-full">
        <div className="w-4 h-4 rounded-full bg-[var(--cruto-off-white)]"></div>
      </div>

      <div className="w-[100%] h-full flex flex-col gap-2 rounded-[var(--cruto-radius)] border border-[var(--cruto-border)] px-2 bg-[--cruto-foreground]">
        <div className="flex items-center justify-between w-full p-2">
          <div className="w-40 h-6 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="p-2 mx-auto">
          <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse mb-2"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="w-full flex justify-center">
          <div className=" w-44 h-5 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        <div className="flex gap-5 w-full border-t border-t-[var(--cruto-border)] justify-around items-center p-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
