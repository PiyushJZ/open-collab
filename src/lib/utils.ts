import { Camera } from '@/interfaces';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = [
  '#023436',
  '#883DC4',
  '#8884FF',
  '#40F99B',
  '#DA7422',
  '#51BBFE',
  '#A480CF',
  '#FF1D15',
  '#1A1B41',
  '#FF14B5',
  '#4BA015',
  '#1DEEB1',
  '#083478',
  '#7A0B58',
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
