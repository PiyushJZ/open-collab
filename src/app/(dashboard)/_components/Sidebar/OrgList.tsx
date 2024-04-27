'use client';

import { useOrganizationList } from '@clerk/nextjs';
import OrganizationItem from './OrganizationItem';

const OrgList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  if (!userMemberships.data?.length) {
    return null;
  }
  return (
    <ul className='space-y-4'>
      {userMemberships.data.map(member => {
        return (
          <OrganizationItem
            key={member.organization.id}
            id={member.organization.id}
            name={member.organization.name}
            imageUrl={member.organization.imageUrl}
          />
        );
      })}
    </ul>
  );
};

export default OrgList;
