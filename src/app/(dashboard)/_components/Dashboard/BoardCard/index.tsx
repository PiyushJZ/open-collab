'use client';

import { Actions } from '@/components';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks';
import { BoardCardProps } from '@/interfaces';
import { useAuth } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
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
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite,
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite,
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => toast.error('Failed to unfavorite'));
    } else {
      onFavorite({ id, orgId }).catch(() => toast.error('Failed to favorite'));
    }
  };

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
          <Actions
            side={'bottom'}
            id={id}
            title={title}
          >
            <button className='absolute right-1 top-1 px-3 py-2 opacity-0 outline-none transition-opacity group-hover:opacity-100'>
              <MoreHorizontal className='text-white opacity-75 transition-opacity hover:opacity-100' />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

export default BoardCard;
