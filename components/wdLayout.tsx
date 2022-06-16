import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import LayoutHeader from './layoutHeader';

export default function WdLayout({
  children,
  searchData,
}: {
  children: React.ReactNode;
  searchData: unknown;
}) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const router = useRouter();
  const headerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setHeaderHeight(headerRef.current.offsetHeight);
    };

    window.addEventListener('resize', handleResize);

    // initial header height
    setHeaderHeight(headerRef.current.offsetHeight);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [router.events]);

  return (
    <div className="font-sans antialiased text-ui-typo bg-ui-background">
      <div className="flex flex-col justify-start min-h-screen">
        <header
          ref={headerRef}
          className="
              sticky
              top-0
              z-10
              w-full
              border-b
              bg-ui-background
              border-ui-border
            "
        >
          <LayoutHeader searchData={searchData} />
        </header>

        {children}
      </div>
    </div>
  );
}
