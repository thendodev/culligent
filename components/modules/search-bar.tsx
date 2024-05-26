import { SearchIcon } from 'lucide-react';
import React from 'react';
import { Input } from '../ui/input';

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="rounded-[8px] px-2 border-[var(--cruto-off-white)] bg-[var(--cruto-whitish)] flex items-center text-[var(--cruto-pale-grey)] h-8">
      <SearchIcon />
      <Input className="border-none" placeholder="Search" />
    </div>
  );
};

export default SearchBar;
