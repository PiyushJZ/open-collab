'use client';

import { BoardCardProps } from '@/interfaces';
import { useAuth } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import Footer from './Footer';
import Overlay from './Overlay';

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  return (
    <Link href={`/board/${id}`}>
      <div className='group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border'>
        <div className='relative flex-1 bg-purple-100'>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='object-fit'
          />
          <Overlay />
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};

export default BoardCard;
