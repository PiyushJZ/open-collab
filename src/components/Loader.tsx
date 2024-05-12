import { LoaderProps } from '@/interfaces';
import { ThreeCircles } from 'react-loader-spinner';
import { twMerge } from 'tailwind-merge';

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={twMerge(
        'flex h-full w-full items-center justify-center',
        className,
      )}
    >
      <ThreeCircles
        ariaLabel='Loading'
        color='#7C3AED'
        height={100}
        width={100}
      />
    </div>
  );
};

export default Loader;
