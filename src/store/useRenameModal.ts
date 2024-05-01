import { RenameModal } from '@/interfaces';
import { create } from 'zustand';

const defaultValues = {
  id: '',
  title: '',
};

export const useRenameModal = create<RenameModal>(set => ({
  isOpen: false,
  initialValues: defaultValues,
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialValues: {
        id,
        title,
      },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: defaultValues,
    }),
}));
