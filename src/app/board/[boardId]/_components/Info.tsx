'use client';

import { Actions, Hint, TabSeparator } from '@/components';
import { Button } from '@/components/ui/button';
import { BUTTON_VARIANTS } from '@/constants';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { InfoProps } from '@/interfaces';
import { cn } from '@/lib/utils';
import { useRenameModal } from '@/store/useRenameModal';
import { useQuery } from 'convex/react';
import { Menu } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

const Info = ({ boardId }: InfoProps) => {
  const data = useQuery(api.board.get, { id: boardId as Id<'boards'> });
  const { onOpen } = useRenameModal();

  return !data ? (
    <Info.Skeleton />
  ) : (
    <div className='absolute left-2 top-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md'>
      <Hint
        label='Go to boards'
        side='bottom'
        align='center'
        side-offset={10}
      >
        <Button
          asChild
          className='px-2'
          variant={BUTTON_VARIANTS.BOARD}
        >
          <Link href={'/'}>
            <Image
              src={'/logo.svg'}
              alt='Logo'
              height={30}
              width={40}
              priority
            />
            <span
              className={cn(
                'ml-2 text-xl font-semibold text-black',
                font.className,
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint
        label='Edit Title'
        side='bottom'
        align='center'
        sideOffset={10}
      >
        <Button
          variant={BUTTON_VARIANTS.BOARD}
          className='px-2 text-base font-normal'
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions
        id={data._id}
        title={data.title}
        side='bottom'
        sideOffset={10}
      >
        <div>
          <Hint
            label='Main Menu'
            side='bottom'
            sideOffset={10}
            align='center'
          >
            <Button
              size={'icon'}
              variant={BUTTON_VARIANTS.BOARD}
            >
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className='absolute left-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md' />
  );
};

export default Info;
