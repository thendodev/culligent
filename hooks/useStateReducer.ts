import { useReducer } from 'react';

export const useStateReducer = <S>(initialState: S) => {
  const [state, dispatch] = useReducer((state: S, newState: Partial<S>) => {
    return { ...state, ...newState };
  }, initialState);
  return [state, dispatch] as const;
};
