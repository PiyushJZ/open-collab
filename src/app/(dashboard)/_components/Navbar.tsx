import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <div className='flex items-center gap-x-4 bg-green-300 p-5'>
      <div className='hidden md:flex md:flex-1 lg:flex lg:flex-1'>
        {/* Search Bar */}
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
