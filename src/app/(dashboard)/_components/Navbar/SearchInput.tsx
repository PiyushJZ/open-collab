'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { ChangeEvent, useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';

const SearchInput = () => {
  const router = useRouter();
  const [debouncedValue, setDebouncedValue] = useDebounceValue('', 500);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
  }, [debouncedValue, router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDebouncedValue(event.target.value);
  };

  return (
    <div className='relative w-full'>
      <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
      <Input
        placeholder='Search Boards'
        className='w-full max-w-lg pl-9'
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
