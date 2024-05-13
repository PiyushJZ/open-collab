'use client';

import { Hint } from '@/components';
import { Button } from '@/components/ui/button';
import { BUTTON_VARIANTS } from '@/constants';
import { ToolButtonProps } from '@/interfaces';

const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Hint
      label={label}
      side='right'
      sideOffset={14}
      align='center'
    >
      <Button
        disabled={isDisabled}
        onClick={onClick}
        variant={
          isActive ? BUTTON_VARIANTS.BOARD_ACTIVE : BUTTON_VARIANTS.BOARD
        }
      >
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolButton;
