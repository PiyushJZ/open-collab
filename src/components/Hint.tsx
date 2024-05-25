'use client';

import { HintProps } from '@/interfaces';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const Hint = ({
  children,
  label,
  align,
  side,
  sideOffset,
  alignOffset,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className='border-black bg-black text-white'
          side={side}
          align={align ?? 'center'}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className='font-semibold capitalize'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
