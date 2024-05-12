import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks';
import { AddBoardButtonProps } from '@/interfaces';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const AddBoardButton = ({ orgId, disabled }: AddBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create);
  const router = useRouter();

  const handleAddBoard = () => {
    mutate({
      orgId,
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
    <button
      disabled={pending || disabled}
      onClick={handleAddBoard}
      className={cn(
        'col-span-1 flex aspect-[100/127] flex-col items-center justify-center rounded-lg bg-purple-500 py-6 font-semibold text-white hover:bg-purple-800',
        pending ||
          (disabled && 'cursor-not-allowed opacity-75 hover:bg-purple-500'),
      )}
    >
      <div />
      <Plus className='h-12 w-12 stroke-1 text-white' />
      <p className='text-xs text-white'>New Board</p>
    </button>
  );
};

export default AddBoardButton;
