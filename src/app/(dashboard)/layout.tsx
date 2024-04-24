import { ComponentWithChildrenProps } from '@/interfaces';
import { Navbar, OrganizationSidebar, Sidebar } from './_components';

const DashboardLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <main>
      <Sidebar />
      <div className='h-full pl-16'>
        <div className='flex h-full gap-x-3'>
          <OrganizationSidebar />
          <div className='h-full flex-1'>
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
