import { useCallback } from 'react';

import useFocus from './useFocus';

export default function SearchFallback() {
  const { isFocused, setIsFocused } = useFocus();
  const handleFocus = useCallback(() => setIsFocused(true), [setIsFocused]);
  return (
    <div className="ais-SearchBox w-full search-dummy" onFocus={handleFocus}>
      <form
        className="ais-SearchBox-form flex"
        noValidate
        action=""
        role="search"
      >
        <input
          className="ais-SearchBox-input block w-full py-2 pl-10 pr-4 border-2 rounded-lg bg-ui-sidebar border-ui-sidebar focus:bg-ui-background"
          type="search"
          placeholder="Пошук у документації"
        />
        <button className="ais-SearchBox-submit" title="Пошук" type="submit">
          <svg
            className="ais-SearchBox-submitIcon absolute inset-y-0 left-0 flex items-center justify-center px-3 py-2 opacity-50"
            width="10"
            height="10"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
          </svg>
        </button>
        <span className="ais-SearchBox-loadingIndicator" hidden={!isFocused}>
          <svg
            aria-label="Результати завантажуються"
            width="16"
            height="16"
            viewBox="0 0 38 38"
            stroke="#444"
            className="ais-SearchBox-loadingIcon"
            aria-hidden="true"
          >
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18"></circle>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  ></animateTransform>
                </path>
              </g>
            </g>
          </svg>
        </span>
      </form>
    </div>
  );
}
