'use client';

import { Hint } from '@/components';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CreateOrganization } from '@clerk/nextjs';
import { Plus } from 'lucide-react';

const NewOrgButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='aspect-square'>
          <Hint
            label='Create New Organization'
            side='right'
            align='center'
            alignOffset={18}
          >
            <button className='flex h-full w-full items-center justify-center rounded-md bg-white/25 opacity-60 transition hover:opacity-100'>
              <Plus color='#FFF' />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className='max-w-[480px] border-none bg-transparent p-0'>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default NewOrgButton;
