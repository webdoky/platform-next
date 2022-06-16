import CopyToClipboardWrapper from 'react-copy-to-clipboard';
import { useCallback, useState } from 'react';
import classNames from 'classnames';

interface Params {
  text: string;
  title: string;
  className?: string;
  children?: JSX.Element;
}

const copiedText = 'Скопійовано в буфер!';

export default function CopyToClipboard(params: Params) {
  const { className, text, title, children } = params;
  const [isCopied, setIsCopied] = useState(false);

  const copyEventHandler = useCallback(() => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }, []);

  return (
    <CopyToClipboardWrapper text={text} onCopy={copyEventHandler}>
      <button
        className={classNames('transition', className, {
          'opacity-25': isCopied,
        })}
        title={isCopied ? copiedText : title}
      >
        {children}
      </button>
    </CopyToClipboardWrapper>
  );
}
