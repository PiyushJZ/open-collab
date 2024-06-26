'use client';

import { Button } from '@/components/ui/button';
import { BUTTON_VARIANTS } from '@/constants';
import { cn } from '@/lib/utils';
import { OrganizationSwitcher } from '@clerk/nextjs';
import { LayoutDashboard, Star } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

const OrganizationSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get('favorites');

  return (
    <div className='hidden w-52 flex-col space-y-6 pl-5 pt-5 md:flex lg:flex'>
      <Link href={'/'}>
        <div className='flex items-center justify-center gap-x-4'>
          <Image
            src={'logo.svg'}
            alt='Logo'
            height={60}
            width={60}
          />
          <span className={cn('text-2xl font-semibold', font.className)}>
            OpenCollab
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
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
      <div className='w-full space-y-1'>
        <Button
          asChild
          size={'lg'}
          variant={
            favorites ? BUTTON_VARIANTS.GHOST : BUTTON_VARIANTS.SECONDARY
          }
          className='gap- w-full items-center justify-start gap-2 px-4 font-normal'
        >
          <Link href={'/'}>
            <LayoutDashboard className='mr-2 h-4 w-4' />
            Team Boards
          </Link>
        </Button>
        <Button
          asChild
          size={'lg'}
          variant={
            !favorites ? BUTTON_VARIANTS.GHOST : BUTTON_VARIANTS.SECONDARY
          }
          className='w-full items-center justify-start gap-2 px-4 font-normal'
        >
          <Link
            href={{
              pathname: '/',
              query: { favorites: true },
            }}
          >
            <Star className='mr-2 h-4 w-4' />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrganizationSidebar;
