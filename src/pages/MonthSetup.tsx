import { Heading } from '../components/Heading';
import { getCurrentMonthInString } from '../lib/utils';
import { WizardForm } from '../components/WizardForm';

export const MonthSetup = () => {
  return (
    <div className='h-full flex flex-col gap-6 p-4 max-w-4xl items-center justify-center'>
      <Heading variant='title' className='border text-red'>
        Month Setup - {getCurrentMonthInString()}
      </Heading>
      <WizardForm />
    </div>
  );
};
