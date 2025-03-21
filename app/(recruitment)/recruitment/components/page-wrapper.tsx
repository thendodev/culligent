import LoadingBar from './loading-bar';

interface IPageWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const PageWrapper = ({ children }: IPageWrapperProps) => {
  return (
    <div className="w-full h-full px-2 flex flex-col mx-auto">
      <LoadingBar />
      <main className="p-5 px-12 w-[95%] h-full mx-auto">{children}</main>
    </div>
  );
};

export default PageWrapper;
