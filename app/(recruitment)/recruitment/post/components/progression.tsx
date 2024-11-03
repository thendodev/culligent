import React from 'react';

interface IProgressionProps {
  stages: any[];
}

const Progression = ({ stages }: IProgressionProps) => {
  return (
    <div className="w-full p-6 border border-[var(--cruto-border)] flex gap-2">
      {stages.map((_, index) => {
        return (
          <div key={index} className="flex-1 h-full">
            div
          </div>
        );
      })}
    </div>
  );
};

export default Progression;
