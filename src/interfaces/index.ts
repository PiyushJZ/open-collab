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