import { Switch } from '@/components/ui/switch';
import { pluralize } from '@/lib/utils';
import { MQuestion } from '@/models/Cases';
import { Calendar, Clock, Pen } from 'lucide-react';
import React from 'react';

type TCaseDetailsProps = {
  name?: string;
  description?: string;
  status?: boolean;
  questions?: MQuestion[];
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const CaseDetails = ({
  name,
  description,
  status,
  questions,
  duration,
  createdAt,
  updatedAt,
}: TCaseDetailsProps) => {
  return (
    <div className="w-full h-fit p-6 bg-[var(--cruto-foreground)] flex justify-center items-center align-middle flex-col gap-2">
      <div className="py-6 flex flex-col gap-2">
        <span className="text-2xl">{name}</span>
        <Switch disabled checked={status} />
      </div>
      <span className="text-center  text-[var(--cruto-text-grey)]">
        {description}
      </span>
      <div className="w-full flex gap-2  p-2">
        <div className="flex-1 p-4 px-8 flex flex-col items-end border border-[var(--cruto-border)]">
          <Pen className="p-2 w-10 h-10 m-auto rounded-full text-white bg-[var(--cruto-off-white)]" />
          <span className="mx-auto text-[var(--cruto-text-grey)]">
            {questions?.length}
            {pluralize(' question', questions?.length ?? 0)}
          </span>
        </div>
        <div className="flex-1 p-4 px-8 flex flex-col items-end border border-[var(--cruto-border)]">
          <Clock className="p-2 w-10 h-10 m-auto rounded-full text-white bg-[var(--cruto-off-white)]" />
          <span className="mx-auto text-[var(--cruto-text-grey)]">
            {duration}
            {pluralize(' hour', duration ?? 1)}
          </span>
        </div>
        <div className="flex-1 p-4 px-8 flex flex-col items-end border border-[var(--cruto-border)]">
          <Calendar className="p-2 w-10 h-10 m-auto rounded-full text-white bg-[var(--cruto-off-white)]" />
          <p className="m-auto flex-1">Created</p>
          <span className="m-auto text-[var(--cruto-text-grey)]">
            {new Date(createdAt ?? '').toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className="flex-1 p-4 px-8 flex flex-col items-end border border-[var(--cruto-border)]">
          <Calendar className="p-2 w-10 h-10 m-auto rounded-full text-white bg-[var(--cruto-off-white)]" />
          <p className="m-auto w-fit">Updated</p>
          <span className="m-auto text-[var(--cruto-text-grey)]">
            {new Date(updatedAt ?? '').toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
