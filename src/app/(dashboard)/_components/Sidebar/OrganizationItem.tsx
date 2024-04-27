'use client';

import { Hint } from '@/components';
import { OrgItemProps } from '@/interfaces';
import { cn } from '@/lib/utils';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import Image from 'next/image';
const OrganizationItem = ({ id, name, imageUrl }: OrgItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id === id;

  const onSelectOrg = () => {
    if (!setActive) {
      return;
    }
    setActive({ organization: id });
  };

  return (
    <div className='relative aspect-square'>
      <Hint
        label={name}
        side='right'
        align='center'
      >
        <Image
          fill
          src={imageUrl}
          alt={name}
          onClick={onSelectOrg}
          className={cn(
            'cursor-pointer rounded-md opacity-75 transition hover:opacity-100',
            isActive && 'opacity-100',
          )}
        />
      </Hint>
    </div>
  );
};

export default OrganizationItem;
