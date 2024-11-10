'use client';

import { CheckCircle2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { currentStage, useStageStore } from '../state/state';
import { useParams, useRouter } from 'next/navigation';

interface IStage {
  name: string;
  href: string;
}
interface IProgressionProps {
  stages: IStage[];
}

const Progression = ({ stages }: IProgressionProps) => {
  const [currentStage, setCurrentStage] = useState<string[]>();
  const router = useRouter();
  const params = useParams();
  const postId = params.id?.[0];

  useEffect(() => {
    const stageSubscription = useStageStore.subscribe((state) => {
      setCurrentStage(state.currentStage);
    });

    return () => {
      stageSubscription();
    };
  });

  return (
    <div className="w-full border border-[var(--cruto-border)] flex gap-2 mb-3">
      {stages.map((stage, index) => {
        return (
          <div
            key={index}
            className={`flex items-center gap-2 flex-1 h-full bg-[var(--cruto-foreground)] p-2`}
            onClick={() => {
              if (!currentStage?.includes(stage.name.toLocaleLowerCase()))
                return;
              router.push(`${stage.href}/${postId}`);
            }}
          >
            <CheckCircle2Icon
              className={`${currentStage?.includes(stage.name.toLocaleLowerCase()) ? 'text-[var(--cruto-green)]' : ''}`}
            />{' '}
            {stage.name}
          </div>
        );
      })}
    </div>
  );
};

export default Progression;
