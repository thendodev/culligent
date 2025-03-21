'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import {
  Copy,
  Edit,
  Eye,
  MoreHorizontal,
  MoreVertical,
  WorkflowIcon,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { ProjectRoutes } from '@/global/routes';
import { useQueryClient } from '@tanstack/react-query';
import { TPost } from '@/validations/posts';
import { TWithId } from '@/global/types';
import { getPostHandler } from '@/handlers/handle-posts';

interface PostActionProps {
  data: TWithId<TPost>;
}

const PostActions = ({ data }: PostActionProps) => {
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({ title: 'Copy ID', description: 'id copied' });
  };

  const queryClient = useQueryClient();

  const prefetchCase = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['posts', data._id],
      queryFn: () => getPostHandler(data._id),
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" sideOffset={4}>
          <DropdownMenuLabel className="flex row-auto align-middle content-center">
            <WorkflowIcon className="mr-2 h-4 w-4" /> Actions
          </DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={() => onCopy(data._id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/${ProjectRoutes.recruitment}/${ProjectRoutes.posts}/${data?._id}`,
              )
            }
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onMouseOver={prefetchCase}
            onClick={() =>
              router.push(
                `/${ProjectRoutes.recruitment}/${ProjectRoutes.post}/${data?._id}`,
              )
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PostActions;
