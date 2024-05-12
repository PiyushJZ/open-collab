'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks';
import { useOrganization } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const EmptyBoard = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const router = useRouter();

  const handleCreateBoard = async () => {
    if (!organization) {
      return;
    }
    mutate({
      orgId: organization.id,
      title: 'Untitled',
    })
      .then(id => {
        toast.success(`Board created`);
        router.push(`/board/${id}`);
      })
      .catch(error => {
        console.error(error);
        toast.error('Failed to create board');
      });
  };
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <Image
        src={'note.svg'}
        alt='empty'
        width={140}
        height={140}
      />
      <h2 className='mt-6 text-2xl font-semibold'>Create your first board!</h2>
      <p className='mt-2 text-sm text-muted-foreground'>
        Start by creating a board for your organization
      </p>
      <div className='mt-6'>
        <Button
          disabled={pending}
          size={'lg'}
          onClick={handleCreateBoard}
        >
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
