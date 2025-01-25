import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { handleCreateSuggestion } from '@/handlers/handleSuggestions';
import { ESuggestionType } from '@/validations/suggestions';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useSuggestive } from '@/hooks/useSuggestion';
import { useDebounce } from 'use-debounce';
interface IAutocompleteProps {
  type: ESuggestionType;
  isSavable?: boolean;
  onSelect: (value: string) => void;
}

const SuggestiveSearch = ({
  type,
  isSavable,
  onSelect,
}: IAutocompleteProps) => {
  const [input, setInput] = useState('');
  const [searchText] = useDebounce(input, 500);

  const { results } = useSuggestive(type, searchText);
  const { mutate: createSuggestion } = useMutation({
    mutationFn: handleCreateSuggestion,
  });

  return (
    <Command>
      <div className="flex justify-between align-middle gap-1 p-1">
        <Input
          className="border-none focus:border-none hover:border-none active:border-none"
          onChange={({ target }) => setInput(target.value)}
          placeholder="Type or search..."
        />
        {input.length > 0 && !results?.length && isSavable && (
          <Button
            variant="outline"
            className="border-none"
            onClick={() => {
              createSuggestion({ query: input, type });
            }}
          >
            Save
          </Button>
        )}
      </div>

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Suggestions">
          {results?.map((suggestions) => (
            <CommandItem key={suggestions._id} onSelect={onSelect}>
              {suggestions.query}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default SuggestiveSearch;
