import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const FocusContext = createContext<{
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}>({ isFocused: false, setIsFocused: () => {} });

export function FocusProvider({ children }) {
  const [isFocused, setIsFocused] = useState(false);

  const focusValue = useMemo(
    () => ({ isFocused, setIsFocused }),
    [isFocused, setIsFocused]
  );

  return (
    <FocusContext.Provider value={focusValue}>{children}</FocusContext.Provider>
  );
}

export function FocusOuterWrapper({ children, ...props }) {
  const rootReference = useRef(null);
  const { isFocused, setIsFocused } = useFocus();

  const handleOutsideClick = useCallback(
    (event) => {
      if (
        !rootReference.current ||
        !rootReference.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    },
    [setIsFocused]
  );

  useEffect(() => {
    if (isFocused) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick, isFocused]);

  const handleFocus = useCallback(() => setIsFocused(true), [setIsFocused]);

  return (
    <div {...props} onFocus={handleFocus} ref={rootReference}>
      {children}
    </div>
  );
}

export default function useFocus() {
  const { isFocused, setIsFocused } = useContext(FocusContext);
  return { isFocused, setIsFocused };
}
