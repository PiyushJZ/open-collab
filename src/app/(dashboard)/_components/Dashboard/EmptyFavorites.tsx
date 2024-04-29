import Image from 'next/image';

const EmptyFavorites = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <Image
        src={'empty-favorites.svg'}
        alt='empty'
        width={140}
        height={140}
      />
      <h2 className='mt-6 text-2xl font-semibold'>No favorite board found</h2>
      <p className='mt-2 text-sm text-muted-foreground'>
        Try adding a board to your favorites
      </p>
    </div>
  );
};

export default EmptyFavorites;
