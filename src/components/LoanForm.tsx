import { useForm } from '@tanstack/react-form';
import type { FieldApi } from '@tanstack/react-form';
import { Input } from './ui/input';
import { Button } from './ui/button';
//import { DatePicker } from './ui/date-picker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className='text-red-400'>{field.state.meta.errors.join(', ')}</em>
      ) : null}
      <em className='text-yellow-400'>
        {field.state.meta.isValidating ? 'Validating...' : null}
      </em>
    </>
  );
}

interface Props {
  addLoan: (loan: Loan) => void;
}

export const LoanForm: React.FC<Props> = ({ addLoan }) => {
  const form = useForm({
    defaultValues: {
      borrower: '',
      quantity: 0,
      dividend: 0,
    },
    onSubmit: async ({ value }) => {
      const newLoan: Loan = {
        borrower: value.borrower,
        dividend: value.dividend,
        quantity: value.quantity,
      };
      addLoan(newLoan);
    },
  });

  return (
    <form
      className=' mt-4 flex flex-col gap-6'
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        <form.Field
          name='borrower'
          validators={{
            onChange: ({ value }) =>
              !value ? 'A borrower name is required' : undefined,
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Name:</label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            );
          }}
        />
      </div>
      <div>
        <form.Field
          name='quantity'
          validators={{
            onChange: ({ value }) =>
              !value ? 'A quantity is required' : undefined,
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Quantity:</label>
                <Input
                  type='number'
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                <FieldInfo field={field} />
              </>
            );
          }}
        />
      </div>
      <div>
        <form.Field
          name='dividend'
          validators={{
            onChange: ({ value }) =>
              !value ? 'A dividend is required' : undefined,
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Dividend:</label>
                <Input
                  type='number'
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                <FieldInfo field={field} />
              </>
            );
          }}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type='submit' disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      />
    </form>
  );
};
