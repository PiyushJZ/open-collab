import { LayerTypes, Side } from '@/constants';
import {
  Camera,
  Color,
  FromInterface,
  LayerType,
  PathLayer,
  Point,
  XYWH,
} from '@/interfaces';
import { LiveMap, LiveObject } from '@liveblocks/core';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS: string[] = [
  '#4DEEEA',
  '#74EE15',
  '#FFE700',
  '#F90716',
  '#FF8E00',
  '#FF00E4',
  '#7C83FD',
  '#890596',
  '#9EDE73',
  '#2F89FC',
];

export function connectionIdToColor(id: number) {
  return COLORS[id % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g
    .toString(16)
    .padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}

export function getContrastColor(color: Color) {
  const luminance = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
  return luminance > 182 ? '#000' : '#fff';
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    ...bounds,
  };

  if ((corner & Side.LEFT) === Side.LEFT) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.RIGHT) === Side.RIGHT) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.TOP) === Side.TOP) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.BOTTOM) === Side.BOTTOM) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}

export const findIntersectingLayersWithRectangle = (
  layerIds: readonly string[],
  layers: LiveMap<string, LiveObject<FromInterface<LayerType>>>,
  a: Point,
  b: Point,
) => {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];
  for (const layerId of layerIds) {
    const layer = layers.get(layerId);
    if (!layer) {
      continue;
    }

    const x = layer.get('x');
    const y = layer.get('y');
    const width = layer.get('width');
    const height = layer.get('height');

    if (
      rect.x < x + width &&
      rect.x + rect.width > x &&
      rect.y < y + height &&
      rect.y + rect.height > y
    ) {
      ids.push(layerId);
    }
  }
  return ids;
};

export function penPointsToPathLayer(
  points: number[][],
  color: Color,
): PathLayer {
  if (points.length < 2) {
    throw new Error('Cannot create path with less than 2 points');
  }
  let left = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y);
  }

  return {
    type: LayerTypes.PATH,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) {
    return '';
  }

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ['M', ...stroke[0], 'Q'],
  );

  d.push('Z');
  return d.join(' ');
}
