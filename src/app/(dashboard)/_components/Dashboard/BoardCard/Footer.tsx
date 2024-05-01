import { FooterProps } from '@/interfaces';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  return (
    <div className='relative bg-white p-3'>
      <p className='max-w-[calc(100%-20px)] truncate text-[13px]'>{title}</p>
      <p className='text-[11px] opacity-0 transition-opacity group-hover:opacity-100'>
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'absolute right-3 top-3 text-muted-foreground opacity-0 transition hover:text-blue-600 group-hover:opacity-100',
          disabled && 'cursor-not-allowed opacity-75',
        )}
      >
        <Star
          className={cn('h-4 w-4', isFavorite && 'fill-blue-600 text-blue-600')}
        />
      </button>
    </div>
  );
};

export default Footer;
