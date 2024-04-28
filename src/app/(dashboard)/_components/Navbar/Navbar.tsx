'use client';

import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
} from '@clerk/nextjs';
import InviteButton from '../InviteButton';
import SearchInput from './SearchInput';

const Navbar = () => {
  const { organization } = useOrganization();

  return (
    <div className='flex items-center gap-x-4 p-5'>
      <div className='hidden md:flex md:flex-1'>
        <SearchInput />
      </div>
      <div className='block flex-1 md:hidden'>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '376px',
              },
              organizationSwitcherTrigger: {
                padding: '6px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                justifyContent: 'space-between',
                backgroundColor: 'white',
              },
            },
          }}
        />
      </div>
      {organization ? <InviteButton /> : <></>}
      <UserButton />
    </div>
  );
};

export default Navbar;
