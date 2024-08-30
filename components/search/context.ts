import { type Dispatch, type SetStateAction, createContext } from 'react';

const SearchFocusedContext = createContext<{
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}>({ isFocused: false, setIsFocused: () => {} });

export default SearchFocusedContext;
