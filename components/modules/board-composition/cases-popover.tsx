import { useLoading } from '@/app/state/loading-state';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TWithId } from '@/global/types';
import { TCase } from '@/validations/cases';
import { PlusIcon } from 'lucide-react';

interface TeamSwitcherProps {
  cases: TWithId<TCase>[] | null | undefined;
  onCaseSelect: (team: TWithId<TCase>) => void;
}

export const CasesPopover = ({ cases, onCaseSelect }: TeamSwitcherProps) => {
  const isLoading = useLoading((state) => state.isOpen);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex justify-start opacity-0 transform translate-y-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-in-out">
          <Button
            className="rounded-none w-full hover:bg-[var(--cruto-background)] flex justify-start"
            type="button"
            variant={'ghost'}
          >
            <PlusIcon className="mr-1 w-4 h-4" /> Create event
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 shadow-none">
        <div className="grid gap-4">
          <Command className="w-full">
            <CommandList className="w-full">
              <CommandInput className="w-full" placeholder="Search..." />
              {isLoading && <CommandItem>Loading teams</CommandItem>}
              {cases?.map((selectCase) => (
                <CommandItem
                  key={selectCase.name}
                  onSelect={() => {
                    onCaseSelect(selectCase);
                  }}
                  className="text-sm"
                >
                  {selectCase.name}
                </CommandItem>
              ))}
              <CommandEmpty>No cases found.</CommandEmpty>
            </CommandList>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CasesPopover;
