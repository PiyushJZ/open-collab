import { CanvasMode, LayerType, Side } from '@/constants';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { LucideIcon } from 'lucide-react';

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

export interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export interface CanvasProps {
  boardId: string;
}

export interface RoomProps extends ComponentWithChildrenProps {
  roomId: string;
  fallback: NonNullable<React.ReactNode> | null;
}

export interface LoaderProps {
  className?: string;
}

export interface InfoProps {
  boardId: string;
}

export interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface Camera {
  x: number;
  y: number;
}

export interface XYWH extends Camera {
  width: number;
  height: number;
}

export interface Point extends Camera {}

export interface Layer extends Camera {
  fill: Color;
  width: number;
  height: number;
  value?: string;
}

export interface RectangleLayer extends Layer {
  type: LayerType.RECTANGLE;
}

export interface EllipseLayer extends Layer {
  type: LayerType.ELLIPSE;
}

export interface PathLayer extends Layer {
  type: LayerType.PATH;
  points: number[][];
}

export interface TextLayer extends Layer {
  type: LayerType.TEXT;
}

export interface NoteLayer extends Layer {
  type: LayerType.NOTE;
}

export type CanvasState =
  | {
      mode: CanvasMode.NONE;
    }
  | {
      mode: CanvasMode.SELECTION_NET;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.TRANSLATING;
      current: Point;
    }
  | {
      mode: CanvasMode.INSERTING;
      layerType:
        | LayerType.ELLIPSE
        | LayerType.RECTANGLE
        | LayerType.TEXT
        | LayerType.NOTE;
    }
  | {
      mode: CanvasMode.PENCIL;
    }
  | {
      mode: CanvasMode.PRESSING;
      origin: Point;
    }
  | {
      mode: CanvasMode.RESIZING;
      initialBound: XYWH;
      corner: Side;
    };

export interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
