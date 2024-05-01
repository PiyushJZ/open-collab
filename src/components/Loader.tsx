import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <ThreeCircles
        ariaLabel='Loading'
        color='#7C3AED'
        height={150}
        width={150}
      />
    </div>
  );
};

export default Loader;
