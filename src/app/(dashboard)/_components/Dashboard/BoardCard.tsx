'use client';

import { BoardCardProps } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
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
      </div>
    </Link>
  );
};

export default BoardCard;
