'use client';

import { DashboardPageProps } from '@/interfaces';
import { useOrganization } from '@clerk/nextjs';
import { BoardList, EmptyOrg } from './_components';

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();
  return (
    <div className='h-[calc(100vh-80px)] flex-1 p-5'>
      {organization ? (
        <BoardList
          orgId={organization.id}
          query={searchParams}
        />
      ) : (
        <EmptyOrg />
      )}
    </div>
  );
};

export default DashboardPage;
