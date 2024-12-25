import { Link, useLocation } from '@tanstack/react-router';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';

export const Nav = () => {
  const location = useLocation();

  return (
    <nav className='flex justify-end'>
      {location.pathname !== '/' && (
        <Link to='/bills'>
          <Button variant={'link'}>Bills</Button>
        </Link>
      )}

      <ModeToggle />
    </nav>
  );
};
