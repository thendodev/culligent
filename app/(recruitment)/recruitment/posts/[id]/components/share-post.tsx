import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Share2Icon } from 'lucide-react';

interface ISharePostProps {}
const SharePost = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Share2Icon className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full space-y-4 p-6">
        <div className="p-2 w-full">
          <h1 className="text-md font-semibold">Share Post</h1>
          <p className="text-sm text-[var(--cruto-pale-grey)]">
            Share this post with your friends and colleagues
          </p>
        </div>
        <Input placeholder="Email" />
        <Button className="w-full">Share Post</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SharePost;
