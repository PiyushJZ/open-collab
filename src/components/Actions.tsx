'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BUTTON_VARIANTS } from '@/constants';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks';
import { ActionsProps } from '@/interfaces';
import { useRenameModal } from '@/store/useRenameModal';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from './Dialogs/ConfirmDialog';
import { Button } from './ui/button';

const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();

  const copyBoardLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied!'))
      .catch(() => toast.error('Failed to copy link!'));
  };

  const deleteBoard = () => {
    mutate({ id })
      .then(() => toast.success('Board deleted!'))
      .catch(() => toast.error('Failed to delete board!'));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className='w-60'
        onClick={e => e.stopPropagation()}
      >
        <DropdownMenuItem
          onClick={copyBoardLink}
          className='cursor-pointer p-3'
        >
          <Link2 className='mr-2 h-4 w-4' />
          Copy Board Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className='cursor-pointer p-3'
        >
          <Pencil className='mr-2 h-4 w-4' />
          Rename
        </DropdownMenuItem>
        <ConfirmDialog
          header='Delete Board?'
          description='This action will permanently delete the board and all its contents.'
          onConfirm={deleteBoard}
          disabled={pending}
        >
          <Button
            className='w-full cursor-pointer justify-start p-3 text-sm font-normal'
            variant={BUTTON_VARIANTS.GHOST}
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Delete
          </Button>
        </ConfirmDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
