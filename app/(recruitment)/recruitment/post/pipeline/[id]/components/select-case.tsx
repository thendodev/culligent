'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Briefcase,
  CheckIcon,
  ChevronsUpDown,
  PlusCircleIcon,
} from 'lucide-react';

import { useLoading } from '@/app/state/loading-state';
import { ProjectRoutes } from '@/global/routes';
import { useRouter } from 'next/navigation';
import { TCase } from '@/models/Cases';
import { FormLabel } from '@/components/ui/form';
import { TWithId } from '@/global/types';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  cases: TWithId<TCase>[] | undefined;
  onCaseSelect: (team: TWithId<TCase>) => void;
  selectedCase: TWithId<TCase> | null | undefined;
}

export default function SelectCase({
  className,
  cases,
  onCaseSelect,
  selectedCase,
}: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const isLoading = useLoading((state) => state.isOpen);
  const router = useRouter();

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <FormLabel className="font-light text-sm">
        Case <sup>(optional)</sup>
      </FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a case"
            className={cn('w-full justify-between', className)}
          >
            <Briefcase className="mr-4 w-4 h-4" />
            {selectedCase?.name ?? <p>Select a case</p>}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(30vw-70px)] p-0">
          <Command className="w-full">
            <CommandList className="w-full">
              <CommandInput className="w-full" placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {isLoading && <CommandItem>Loading teams</CommandItem>}
              {cases?.map((selectCase) => (
                <CommandItem
                  key={selectCase.name}
                  onSelect={() => {
                    onCaseSelect(selectCase);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  {selectCase.name}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedCase?._id === selectCase._id
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircleIcon className="mr-2 h-5 w-5" />
                    Create Case
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure ?</DialogTitle>
          <DialogDescription>
            So, you are about to leave this page and go the new case page, we
            will save this post as a draft and you can find it in the posts page
            where you can continue editing it.
          </DialogDescription>
          <Button
            variant="outline"
            className="w-fit"
            onClick={() =>
              router.push(`/recruitment/${ProjectRoutes.case_builder}/`)
            }
          >
            Leave
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
