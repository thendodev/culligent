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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckIcon, ChevronsUpDown, Link, PlusCircleIcon } from 'lucide-react';

import { MTeam } from '@/models/Teams';
import { useLoading } from '@/app/state/loading-state';
import { ProjectRoutes } from '@/global/routes';
import { useRouter } from 'next/navigation';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  teams: MTeam[] | null | undefined;
  onTeamSelect: (team: MTeam) => void;
  selectedTeam: MTeam | null | undefined;
}

export default function SelectCase({
  className,
  teams,
  onTeamSelect,
  selectedTeam,
}: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const isLoading = useLoading((state) => state.isOpen);
  const router = useRouter();

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a case"
            className={cn('w-full justify-between', className)}
          >
            {selectedTeam?.name ?? <p>Select a case</p>}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[80%] p-0">
          <Command className="w-[80%]">
            <CommandList className="w-full">
              <CommandInput className="w-full" placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {isLoading && <CommandItem>Loading teams</CommandItem>}
              {teams?.map((team) => (
                <CommandItem
                  key={team.name}
                  onSelect={() => {
                    onTeamSelect(team);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  {team.name}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedTeam?._id === team._id
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
