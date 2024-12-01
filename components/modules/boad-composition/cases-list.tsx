import React from 'react';
import { useFieldArray, useFormContext, UseFormReturn } from 'react-hook-form';
import { TStage } from '@/validations/pipeline';
import { TCase } from '@/models/Cases';
import CasesPopover from './cases-popover';
import { useQuery } from '@tanstack/react-query';
import { EGenericQueryKeys } from '@/global/config';
import { getCasesHandler } from '@/handlers/handleCases';
import { TWithId } from '@/global/types';
import { Briefcase, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ICasesListProps {
  caseIndex: number;
}

const CasesList = ({ caseIndex }: ICasesListProps) => {
  const [cases, setCases] = React.useState<TWithId<TCase>[]>([]);

  const { data } = useQuery({
    queryKey: [EGenericQueryKeys.CASES],
    queryFn: getCasesHandler,
  });

  const form = useFormContext<TStage | TWithId<TStage>>();

  const { fields, update } = useFieldArray({
    name: `cases`,
    control: form.control,
  });

  const handleCaseAdd = (selectedCase: TWithId<TCase>) => {
    setCases((prev) => [...prev, selectedCase]);
    update(caseIndex, selectedCase._id);
  };

  console.log(cases);

  return (
    <div className="p-2 space-y-1">
      {cases.map((item) => (
        <div
          key={item._id}
          className="group/cases text-sm flex items-center justify-between gap-1 hover: cursor-pointer border-y border-[var(--cruto-border)] hover:bg-[var(--cruto-background)]"
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
            <MoreVertical className="w-4 h-4 text-[var(--cruto-pale-black)] opacity-0 transform translate-y-0 group-hover/cases:opacity-100 group-hover/cases:translate-y-0 transition-all duration-200 ease-in-out" />
          </div>
        </div>
      ))}
      <CasesPopover cases={data} onCaseSelect={handleCaseAdd} />
    </div>
  );
};

export default CasesList;
