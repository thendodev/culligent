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
  MoreHorizontal,
  MoreVertical,
  Trash,
  WorkflowIcon,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { MCase } from '@/models/Cases';

type TCaseActionsProps = {
  id?: string;
};

const CaseActions = ({ id }: TCaseActionsProps) => {
  const router = useRouter();
  const params = useParams();

  const onCopy = () => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    toast({ title: 'Copy ID', description: 'id copied' });
  };

  const onDelete = async () => {
    try {
      router.refresh();
      router.push(`/${params.storeId}/billboards/`);
      toast({ title: 'Request Success', description: 'Billboard Deleted' });
    } catch (e) {
      toast({
        title: 'Request Failure',
        description: 'Error, Something happened',
      });
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreVertical className=" h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex row-auto align-middle content-center">
            <WorkflowIcon className="mr-2 h-4 w-4" /> Actions
          </DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" /> Copy id
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>{' '}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CaseActions;
