import { Link } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { useErrorBoundary } from 'react-error-boundary';

export const Error = () => {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div className=' flex flex-col items-center justify-center p-4 max-w-xl m-auto gap-6'>
      <p className=''>💸</p>
      <p>Something went wrong</p>
      <Link to='/dashboard'>
        <Button onClick={resetBoundary}>Go to Dashboard</Button>
      </Link>
    </div>
  );
};
