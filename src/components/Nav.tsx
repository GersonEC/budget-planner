import { Link, useLocation } from '@tanstack/react-router';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

export const Nav = () => {
  const location = useLocation();

  return (
    <header>
      <nav className='flex justify-end pb-1 border-b-2 gap-2'>
        {location.pathname !== '/' && (
          <Link to='/bills'>
            <Button variant={'link'}>Bills</Button>
          </Link>
        )}

        <ModeToggle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
};
