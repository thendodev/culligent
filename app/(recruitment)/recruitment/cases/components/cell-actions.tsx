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
  Trash,
  WorkflowIcon,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { MCase } from '@/models/Cases';
import { ProjectRoutes } from '@/global/routes';

interface CellActionProps {
  data: MCase;
}

const CellActions = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({ title: 'Copy ID', description: 'id copied' });
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${params.storeId}/billboards/${params.id}`);
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
            <MoreHorizontal className=" h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex row-auto align-middle content-center">
            <WorkflowIcon className="mr-2 h-4 w-4" /> Actions
          </DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={() => onCopy(data._id.toString())}>
            <Copy className="mr-2 h-4 w-4" /> Copy id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/${ProjectRoutes.recruitment}/${ProjectRoutes.cases}/${data?._id}`,
              )
            }
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/${ProjectRoutes.recruitment}/${ProjectRoutes.case_builder}/${data?._id}`,
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

export default CellActions;
