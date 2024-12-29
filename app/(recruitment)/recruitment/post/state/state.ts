import { create } from 'zustand';

interface IStageState {
  currentStage: string[];
  setCurrentStage: (stage: string) => void;
}
export const useStageStore = create<IStageState>()((set) => ({
  currentStage: [''],
  setCurrentStage: (stage) =>
    set(({ currentStage }) => ({ currentStage: [...currentStage, stage] })),
}));

export const currentStage = useStageStore.subscribe;
export const setCurrentStage = (stage: string) =>
  useStageStore.getState().setCurrentStage(stage);
