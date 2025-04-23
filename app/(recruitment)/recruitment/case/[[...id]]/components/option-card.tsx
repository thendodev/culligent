import { Button } from '@/components/ui/button';
import React, { ReactNode } from 'react';

type TOptionCardProps = {
  onClick: () => void;
  children: ReactNode;
};

const OptionCard = ({ onClick, children }: TOptionCardProps) => {
  return (
    <Button
      type="button"
      variant={'outline'}
      onClick={onClick}
      className="h-[1rem] rounded-[0.5rem] w-fit flex flex-row justify-center content-center items-center p-5 text-[var(--cruto-black)] hover:text-[var(--cruto-green)] hover:bg-[var(--cruto-white)] hover:scale-105 bg-[var(--cruto-white)] border-[1px] border-[var(--cruto-border)]"
    >
      {children}
    </Button>
  );
};

export default OptionCard;
