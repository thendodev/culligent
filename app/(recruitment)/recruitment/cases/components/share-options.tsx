import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

type TShareOptionsProps = {
  image?: string;
  name: string;
  email: string;
  userId: string;
  caseId: string;
};

const ShareOptions = ({}: TShareOptionsProps) => (
  <div className="flex items-center justify-between space-x-4">
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="/avatars/05.png" />
        <AvatarFallback>IN</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
        <p className="text-sm text-muted-foreground">b@example.com</p>
      </div>
    </div>
    <Select defaultValue="view">
      <SelectTrigger className="ml-auto w-[110px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="border border-[var(--cruto-border)] rounded-[var(--cruto-radius)]">
        <SelectItem value="edit">Can edit</SelectItem>
        <SelectItem value="view">Can view</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default ShareOptions;
