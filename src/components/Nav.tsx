import { Link, useLocation } from '@tanstack/react-router';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';

export const Nav = () => {
  const location = useLocation();

  return (
    <nav className='flex justify-end pb-1 border-b-2'>
      {location.pathname !== '/' && (
        <Link to='/bills'>
          <Button variant={'link'}>Bills</Button>
        </Link>
      )}

      <ModeToggle />
    </nav>
  );
};
