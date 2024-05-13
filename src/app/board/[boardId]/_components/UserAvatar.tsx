import { Hint } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserAvatarProps } from '@/interfaces';

const UserAvatar = ({ src, name, fallback, borderColor }: UserAvatarProps) => {
  return (
    <Hint
      label={name ?? 'Teammate'}
      side='bottom'
      align='center'
    >
      <Avatar
        style={{ borderColor }}
        className='h-8 w-8 border-2'
      >
        <AvatarImage src={src} />
        <AvatarFallback className='text-xs font-semibold'>
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

export default UserAvatar;
