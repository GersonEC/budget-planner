import { LoaderCircle } from 'lucide-react';

export const Loader = () => {
  return (
    <div className=' h-svh w-full flex justify-center items-center'>
      <LoaderCircle className='size-8 animate-spin' />
    </div>
  );
};
