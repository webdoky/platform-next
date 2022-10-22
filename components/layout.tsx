import { XIcon, MenuIcon } from './icons';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import LayoutHeader from './layoutHeader';
import LayoutFooter from './layoutFooter';
import Sidebar from './sidebar';
import { SidebarSection } from './sidebar';

interface Params {
  children: React.ReactNode;
  hasSidebar?: boolean;
  sidebarSections: SidebarSection[];
  currentPage: { path };
}

export default function Layout({
  children,
  hasSidebar = false,
  sidebarSections = [],
  currentPage,
}: Params) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const headerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setHeaderHeight(headerRef.current.offsetHeight);
    };
    const handleRouteChange = () => {
      setSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    router.events.on('routeChangeStart', handleRouteChange);

    // initial header height
    setHeaderHeight(headerRef.current.offsetHeight);

    return () => {
      window.removeEventListener('resize', handleResize);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const sidebarTogglerHandler = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarStyle = {
    top: `${headerHeight}px`,
    height: `calc(100vh - ${headerHeight}px)`,
  };

  return (
    <>
      <div className="font-sans antialiased text-ui-typo bg-ui-background">
        <div className="flex flex-col justify-start min-h-screen">
          <header
            ref={headerRef}
            className="sticky top-0 z-10 w-full border-b bg-ui-background border-ui-border"
          >
            <LayoutHeader />
          </header>

          <main className="container relative flex flex-wrap justify-start flex-1 w-full bg-ui-background">
            <div
              className={classNames(
                'w-full pb-24',
                hasSidebar && 'pl-0 lg:pl-12 lg:w-3/4'
              )}
            >
              {children}
            </div>

            {hasSidebar && (
              <aside
                className={classNames(
                  'sidebar border-r sticky overflow-y-auto lg:w-1/4 order-first',
                  sidebarOpen && 'open'
                )}
                style={sidebarStyle}
              >
                <div className="w-full pb-16 bg-ui-background">
                  <Sidebar
                    sections={sidebarSections}
                    currentPage={currentPage}
                  />
                </div>
              </aside>
            )}
          </main>

          <footer className="border-t border-ui-border">
            <LayoutFooter />
          </footer>
        </div>

        {hasSidebar && (
          <div className="fixed bottom-0 right-0 z-50 p-8 lg:hidden">
            <button
              className="p-3 text-white rounded-full shadow-lg bg-ui-primary hover:text-white"
              onClick={sidebarTogglerHandler}
            >
              {sidebarOpen && <XIcon size={1.5} />}
              {!sidebarOpen && <MenuIcon size={1.5} />}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
