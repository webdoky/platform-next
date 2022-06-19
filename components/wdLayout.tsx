import LayoutHeader from './layoutHeader';

export default function WdLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans antialiased text-ui-typo bg-ui-background">
      <div className="flex flex-col justify-start min-h-screen">
        <header className="sticky top-0 z-10 w-full border-b bg-ui-background border-ui-border">
          <LayoutHeader />
        </header>

        {children}
      </div>
    </div>
  );
}
