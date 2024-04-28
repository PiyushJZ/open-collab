'use client';

import { useOrganization } from '@clerk/nextjs';
import { EmptyOrg } from './_components';

const DashboardPage = () => {
  const { organization } = useOrganization();
  return (
    <div className='h-[calc(100vh-80px)] flex-1 p-5'>
      {organization ? <div>Board</div> : <EmptyOrg />}
    </div>
  );
};

export default DashboardPage;
