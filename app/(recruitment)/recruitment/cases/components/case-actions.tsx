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
  MoreVertical,
  Share,
  Trash,
  WorkflowIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { ProjectRoutes } from '@/global/routes';
import { deleteCaseHandler } from '@/handlers/handleCases';
import { openAlert } from '@/app/state/alert-state';

type TCaseActionsProps = {
  id?: string;
};

const CaseActions = ({ id }: TCaseActionsProps) => {
  const router = useRouter();

  const onCopy = () => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    toast({ title: 'Copy ID', description: 'id copied' });
  };

  const onOpenAlert = () =>
    openAlert({
      title: 'Delete Case',
      description: 'Are you sure you want to delete this case?',
      action: onDelete,
    });

  const onDelete = async () => {
    if (!id) return;
    deleteCaseHandler(id);
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
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/${ProjectRoutes.recruitment}/${ProjectRoutes.case_builder}/${id}`,
              )
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenAlert}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Share className="mr-2 h-4 w-4" /> Share with
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CaseActions;
