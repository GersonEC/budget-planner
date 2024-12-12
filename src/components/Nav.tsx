import { Link } from '@tanstack/react-router';
import { ModeToggle } from './ModeToggle';

export const Nav = () => {
  return (
    <nav className='flex justify-end'>
      <Link to='/dashboard'>
        {/* <Button variant={'link'}>Dashboard</Button> */}
      </Link>
      <ModeToggle />
    </nav>
  );
};
