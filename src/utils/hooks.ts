// Import the core functions and libraries
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Import the infered `types` from the main `store.ts`
import type { RootState, AppDispatch } from '../redux/store'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
//
// REF: https://redux.js.org/tutorials/typescript-quick-start#define-typed-hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector