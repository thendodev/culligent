import { create } from 'zustand';

type TAlert = {
  title: string;
  description: string;
  action: () => void;
  isOpen: boolean;
};

type TAlertProps = {
  title: string;
  description: string;
  action: () => void;
};

const initalState: TAlert = {
  title: '',
  description: '',
  action: () => {},
  isOpen: false,
};

//

export const useAlert = create<TAlert>()((set) => ({
  ...initalState,
}));

export const close = () => {
  useAlert.setState(() => ({
    ...initalState,
  }));
};

export const alert = ({ title, description, action }: TAlertProps) => {
  useAlert.setState(() => ({
    isOpen: true,
    title,
    description,
    action,
  }));
};
