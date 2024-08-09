'use client';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAlert, close } from '@/app/state/alert-state';

const AlertModal = () => {
  const { title, description, action, isOpen } = useAlert((state) => ({
    title: state.title,
    description: state.description,
    action: state.action,
    isOpen: state.isOpen,
  }));

  const handleAction = () => {
    action();
    close();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => close()}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
