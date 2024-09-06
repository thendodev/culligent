import React from 'react';

type TFormProps = {
  title: string;
  children: React.ReactNode;
};

export const FormWrapper = ({ title, children }: TFormProps) => {
  return (
    <form className="w-full border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] bg-[var(--cruto-foreground)]">
      <div className="w-full text-xl font-bold p-4">{title}</div>
      <div className="w-full space-y-1 p-2 border border-[var(--cruto-border)]">
        {children}
      </div>
    </form>
  );
};

type TFormGroupProps = {
  section: string;
  description: string;
  children: React.ReactNode;
};
export const FormCollection = ({
  section,
  description,
  children,
}: TFormGroupProps) => {
  return (
    <div className="w-full space-y-1 p-1">
      <div className="w-full flex">
        <div className="w-1/3 p-4 bg-[var(--cruto-background)]">
          <div>
            <p className="text-xl font-bold">{section}</p>
            <span>{description}</span>
          </div>
        </div>
        <div className="w-2/3 p-4 space-y-2">
          {children}
          {}
        </div>
      </div>
    </div>
  );
};

export const FormFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-end gap-2 p-2  bg-[var(--cruto-background)]">
      {children}
    </div>
  );
};
