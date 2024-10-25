import { Link } from '@tanstack/react-router';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';

export const Nav = () => {
  return (
    <nav className=' border-b-2 mb-4 flex justify-end'>
      <Link to='/'>
        <Button variant={'link'}>Month setup</Button>
      </Link>
      <Link to='/bills'>
        <Button variant={'link'}>Bills</Button>
      </Link>
      <Link to='/categories'>
        <Button variant={'link'}>Categories</Button>
      </Link>
      <ModeToggle />
    </nav>
  );
};
