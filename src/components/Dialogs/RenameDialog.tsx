'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BUTTON_VARIANTS } from '@/constants';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks';
import { useRenameModal } from '@/store/useRenameModal';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const RenameDialog = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);
  const { mutate, pending } = useApiMutation(api.board.update);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success('Board renamed!');
        onClose();
      })
      .catch(() => toast.error('Failed to rename board!'));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board Title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form
          onSubmit={handleSubmit}
          className='space-y-4'
        >
          <Input
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Board Title'
            disabled={pending}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={BUTTON_VARIANTS.OUTLINE}>Close</Button>
            </DialogClose>
            <Button
              disabled={pending}
              type='submit'
            >
              Save
            </Button>
          </DialogFooter>
          <DialogFooter></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
