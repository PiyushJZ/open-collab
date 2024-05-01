import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <ThreeCircles
        ariaLabel='Loading'
        color='#7C3AED'
        height={100}
        width={100}
      />
    </>
  );
};

export default Loader;
