import LoadingBar from './loading-bar';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="w-full h-full px-2 flex flex-col mx-auto">
      <LoadingBar />
      <main className="p-5 px-12 w-full h-full">{children}</main>
    </div>
  );
};

export default PageWrapper;
