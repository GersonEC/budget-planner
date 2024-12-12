import { Link } from '@tanstack/react-router';
import { ModeToggle } from './ModeToggle';

export const Nav = () => {
  return (
    <nav className=' border-b-2 mb-4 flex justify-end'>
      <Link to='/dashboard'>
        {/* <Button variant={'link'}>Dashboard</Button> */}
      </Link>
      <ModeToggle />
    </nav>
  );
};
