'use client';

import { useOrganizationList } from '@clerk/nextjs';
import OrganizationItem from './OrganizationItem';

const OrgList = () => {
  const { userMemberships, isLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  if (!isLoaded) {
    return <></>;
  }
  if (!userMemberships.data?.length) {
    return <></>;
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
