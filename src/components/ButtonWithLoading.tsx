import { Loader2 } from 'lucide-react';

import { Button } from './ui/button';
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  loading: LoadingStatus;
  children: React.ReactNode;
};

export function ButtonWithLoading(props: ButtonProps) {
  const isLoading = props.loading === 'loading';
  return (
    <Button disabled={isLoading}>
      {isLoading && <Loader2 className='animate-spin' />}
      {props.children}
    </Button>
  );
}
