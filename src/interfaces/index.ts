import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

export interface ComponentWithChildrenProps {
  children: React.ReactNode;
}

export interface ConvexClientProviderProps extends ComponentWithChildrenProps {}

export interface OrgItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export interface HintProps extends ComponentWithChildrenProps {
  label: string;
  side: 'top' | 'bottom' | 'right' | 'left';
  align: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
}

export interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

export interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

export interface AddBoardButtonProps {
  orgId: string;
  disabled: boolean;
}

export interface ActionsProps extends ComponentWithChildrenProps {
  side: DropdownMenuContentProps['side'];
  sideOffset?: DropdownMenuContentProps['sideOffset'];
  id: string;
  title: string;
}

export interface ConfirmDialogProps extends ComponentWithChildrenProps {
  onConfirm: () => void;
  disabled: boolean;
  header: string;
  description?: string;
}

export interface RenameModal {
  isOpen: boolean;
  initialValues: {
    id: string;
    title: string;
  };
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}
