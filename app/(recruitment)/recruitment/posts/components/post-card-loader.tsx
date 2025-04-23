import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const PostCardLoader = () => {
  return (
    <Card className="w-[20rem] shadow-none animate-pulse">
      <CardHeader>
        <CardTitle className="flex justify-between align-middle items-center">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </CardTitle>
        <CardDescription>
          <div className="h-3 bg-gray-300 rounded w-1/2 mt-2"></div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-sm font-semibold">Description</span>
        <div className="h-3 bg-gray-300 rounded w-full mt-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 mt-2"></div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1">
        <div className="flex items-center align-middle gap-1 text-[0.60rem] border rounded-md p-1">
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="flex items-center align-middle gap-1 text-[0.60rem] border rounded-md p-1">
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCardLoader;
