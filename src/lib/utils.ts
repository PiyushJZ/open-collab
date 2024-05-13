import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = [
  '#023436',
  '#F03A47',
  '#96C5F7',
  '#8884FF',
  '#40F99B',
  '#FFD046',
  '#DA7422',
  '#C2F261',
  '#51BBFE',
  '#8FF7A7',
  '#AF4D98',
  '#2F4858',
  '#FF499E',
  '#49B6FF',
  '#A480CF',
  '#C7EF00',
  '#FF1D15',
  '#1A1B41',
  '#3B60E4',
  '#A846A0',
  '#F0386B',
];

export function connectionIdToColor(id: number) {
  return COLORS[id % COLORS.length];
}
