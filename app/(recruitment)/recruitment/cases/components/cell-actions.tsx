'use client';

import React, { useState } from 'react';
import { FlipVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Copy, Edit, MoreHorizontal, Trash, WorkflowIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { MCase } from '@/models/Cases';
import AlertModal from '@/components/modules/alert-modal';

interface CellActionProps {
  data: MCase;
}

const CellActions: React.FC<CellActionProps> = ({ data }) => {
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
            onClick={() => router.push(`/${params.storeId}/case/${data._id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete case</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this case?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellActions;
