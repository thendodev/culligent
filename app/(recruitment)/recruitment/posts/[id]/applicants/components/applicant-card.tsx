import { TWithId } from '@/global/types';
import { TPost } from '@/models/Posts';
import React from 'react';

interface IJobCardProps {
  job: TWithId<TPost>;
}

const JobCard = ({ job }: IJobCardProps) => {
  return (
    <div className="border border-[var(--cruto-border)] max-w-60 max-h-max-60">
      <div className="text-sm text-[var(--cruto-pale-grey)]">{job.role}</div>
      <div className="text-xl"> {job.title}</div>
      <div className="bg-[var(--cruto-background)]">
        <div className="text-sm text-[var(--cruto-pale-grey)]">
          <p>Applicants</p>
          {job.applicants?.length}
        </div>
        <div className="text-sm text-[var(--cruto-pale-grey)]">
          <p>Candidates</p>
          {job.applicants?.length}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
