import { useReducer } from 'react';

export const useStateReducer = <S>(
  reducer: (state: S) => S,
  initialState: S,
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch] as const;
};
