import BreadCrumbs from '../../../../components/ui/breadcrumbs';
import LoadingBar from './loading-bar';

interface PageWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

/**
 * PageWrapper component renders a page layout with:
 * - Breadcrumbs navigation
 * - Page title and description
 * - Content section passed as children prop
 * - Separator divider
 * @@param title - page title - must be same as page url eg dashboard == './dashboard'
 * @@param description - page description -- describes where the user is in the app
 */

const PageWrapper = ({ description, children }: PageWrapperProps) => {
  return (
    <div className="w-full px-2 min-h-screen flex flex-col mx-auto">
      <BreadCrumbs homeUrl="/dashboard" homeElement="dashboard">
        <p className="text-end text-sm w-full text-[color:var(--cruto-pale-grey)]">
          {description.toLocaleUpperCase()}
        </p>
      </BreadCrumbs>
      <LoadingBar />

      <main className="p-5 px-12 w-full h-full">{children}</main>
    </div>
  );
};

export default PageWrapper;
