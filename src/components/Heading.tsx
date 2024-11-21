import React, { ComponentProps } from 'react';

type Props = ComponentProps<'text'> & {
  variant: 'title' | 'subtitle' | 'subheading';
  children: React.ReactNode;
};

export const Heading: React.FC<Props> = ({ variant, children }) => {
  if (variant === 'title')
    return <h1 className='text-2xl text-orange-400 mb-4'>{children}</h1>;
  if (variant === 'subtitle')
    return <h2 className='text-lg text-yellow-400 mt-4 mb-2'>{children}</h2>;
  if (variant === 'subheading')
    return <h3 className='text-md text-amber-200 mt-4 mb-2'>{children}</h3>;
};
