import NewOrgButton from './NewOrgButton';
import OrgList from './OrgList';

const Sidebar = () => {
  return (
    <div className='fixed left-0 z-[1] flex h-full w-16 flex-col gap-y-4 bg-blue-950 p-3 text-white'>
      <OrgList />
      <NewOrgButton />
    </div>
  );
};

export default Sidebar;
