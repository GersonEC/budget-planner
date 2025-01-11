import React, { ComponentProps } from 'react';

type Props = ComponentProps<'text'> & {
  variant: 'title' | 'subtitle' | 'subheading';
  children: React.ReactNode;
};

export const Heading: React.FC<Props> = ({ variant, children }) => {
  if (variant === 'title')
    return <h1 className='text-2xl font-bold text-white my-1'>{children}</h1>;
  if (variant === 'subtitle')
    return (
      <h2 className='text-lg font-semibold text-orange-300 my-1'>{children}</h2>
    );
  if (variant === 'subheading')
    return <h3 className='text-md text-slate-400 my-2'>{children}</h3>;
};
