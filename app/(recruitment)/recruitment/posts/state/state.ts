import { EGenericQueryKeys } from '@/global/config';
import { EPostView, TPostFilters } from '@/validations/user-settings';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IPostViewContext {
  currentStoredView: EPostView;
  setCurrentStoredView: (view: EPostView) => void;
}

interface IPostContext {
  filters: TPostFilters;
  state: {
    queryKey: string[];
  };
  setContext: (state: IPostContext['state']) => void;
  setFilters: (filters: IPostContext['filters']) => void;
}

export const usePostViewStore = create<IPostViewContext>()(
  persist(
    (set) => ({
      currentStoredView: EPostView.CARDS,
      setCurrentStoredView: (view) => set({ currentStoredView: view }),
    }),
    {
      name: 'post-view-storage',
      partialize: (state) => ({ currentStoredView: state.currentStoredView }),
    },
  ),
);

export const usePostContext = create<IPostContext>()((set) => ({
  filters: {
    dateRange: new Date(),
    minApplicants: -1,
    maxApplicants: -1,
    includeArchived: false,
    includeUnpublished: false,
  },
  state: {
    queryKey: [EGenericQueryKeys.POSTS],
  },
  setContext: (state) => set({ state }),
  setFilters: (filters) => set({ filters }),
}));
