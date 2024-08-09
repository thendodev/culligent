import { create } from 'zustand';

type TLoading = {
  isOpen: boolean;
};

export const useLoading = create<TLoading>((set) => ({
  isOpen: false,
}));

export const setLoading = (bool: boolean) => {
  useLoading.setState(() => ({
    isOpen: bool,
  }));
};
