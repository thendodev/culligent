'use client';

import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import SuggestiveSearch from '@/components/modules/suggestive-search';
import { ESuggestionType } from '@/validations/suggestions';
type SkillsCombobox = {
  field: any;
};

export function SkillsCombobox({ field }: SkillsCombobox) {
  const [open, setOpen] = React.useState(false);
  const onSelect = (currentValue: string) => {
    field.onChange(currentValue === field.value ? '' : currentValue);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {field.value ?? 'Select a skill...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <SuggestiveSearch
          type={ESuggestionType.CASES}
          onSelect={onSelect}
          isSavable={true}
        />
      </PopoverContent>
    </Popover>
  );
}
