export enum BUTTON_VARIANTS {
  DEFAULT = 'default',
  DESTRUCTIVE = 'destructive',
  OUTLINE = 'outline',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  LINK = 'link',
  BOARD = 'board',
  BOARD_ACTIVE = 'boardActive',
}

export enum CanvasMode {
  NONE,
  PRESSING,
  SELECTION_NET,
  TRANSLATING,
  INSERTING,
  RESIZING,
  PENCIL,
}

export enum LayerTypes {
  RECTANGLE,
  ELLIPSE,
  PATH,
  TEXT,
  NOTE,
}

export enum Side {
  TOP = 1,
  BOTTOM = 2,
  LEFT = 4,
  RIGHT = 8,
}
