import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TPipeline } from '@/validations/pipeline';
import { TCase } from '@/models/Cases';
import CasesPopover from './cases-popover';
import { useQuery } from '@tanstack/react-query';
import { EGenericQueryKeys } from '@/global/config';
import { getCasesHandler } from '@/handlers/handleCases';
import { TWithId } from '@/global/types';
import { Briefcase, MoreVertical, Trash2Icon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface ICasesListProps {
  stageIndex: number;
}

const CasesList = ({ stageIndex }: ICasesListProps) => {
  const [cases, setCases] = React.useState<TWithId<TCase>[]>([]);

  const { data } = useQuery({
    queryKey: [EGenericQueryKeys.CASES],
    queryFn: getCasesHandler,
  });

  const form = useFormContext<TPipeline | TWithId<TPipeline>>();

  const { append, remove } = useFieldArray({
    name: `stages.${stageIndex}.cases`,
    control: form.control,
  });

  const handleCaseAdd = (selectedCase: TWithId<TCase>) => {
    let isAppended = false;
    setCases((prev) => {
      const isExists = prev.some((item) => item._id === selectedCase._id);
      if (!isExists) {
        isAppended = true;
        return [...prev, selectedCase];
      }
      return prev;
    });
    if (!isAppended) return;
    append(selectedCase._id);
  };

  const handleDelete = (caseId: string, caseIndex: number) => {
    remove(caseIndex);
    setCases((prev) => prev.filter((item) => item._id !== caseId));
  };

  return (
    <div className="p-2 space-y-1">
      {cases.map((item, index) => (
        <div
          key={item._id}
          className="group/cases flex items-center justify-between gap-1 hover: cursor-pointer border border-[var(--cruto-border)] hover:bg-[var(--cruto-background)] hover:border-b-[var(--cruto-background)]"
        >
          <div className="flex items-center gap-1 p-2">
            <Briefcase className="w-4 h-4 mr-2" />
            {item.name}
          </div>
          <div className="mr-2">
            {item.sharedWith?.map((item) => (
              <Avatar key={item.user._id.toString()} className="w-4 h-4">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <MoreVertical className="w-4 h-4 text-[var(--cruto-pale-black)] opacity-0 transform translate-y-0 group-hover/cases:opacity-100 group-hover/cases:translate-y-0 transition-all duration-200 ease-in-out" />
              </PopoverTrigger>
              <PopoverContent className="w-fit p-1">
                <Button
                  variant="ghost"
                  className="hover:bg-[var(--cruto-background)]"
                  onClick={() => handleDelete(item._id, index)}
                >
                  <Trash2Icon className="mr-2 w-4 h-4" />
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
      <CasesPopover cases={data} onCaseSelect={handleCaseAdd} />
    </div>
  );
};

export default CasesList;
