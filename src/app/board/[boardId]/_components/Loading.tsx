import { Loader } from '@/components';
import Info from './Info';
import Participants from './Participants';
import Toolbar from './Toolbar';

const Loading = () => {
  return (
    <main className='relative flex h-screen w-screen touch-none items-center justify-center bg-neutral-100'>
      <Loader />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
};

export default Loading;
