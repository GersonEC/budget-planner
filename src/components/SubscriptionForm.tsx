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
  addSubscription: (subscription: Subscription) => void;
}

export const SubscriptionForm: React.FC<Props> = ({ addSubscription }) => {
  const form = useForm({
    defaultValues: {
      name: '',
      status: 'active',
      category: '',
      renewalDate: new Date(),
      monthlyCost: 0,
      yearlyCost: 0,
      billing: 'monthly',
    },
    onSubmit: async ({ value }) => {
      const newSubscription: Subscription = {
        name: value.name,
        status: 'active',
        category: value.category,
        renewalDate: new Date(),
        monthlyCost: value.monthlyCost,
        yearlyCost: value.yearlyCost,
        billing: 'monthly',
      };
      addSubscription(newSubscription);
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
          name='name'
          validators={{
            onChange: ({ value }) =>
              !value ? 'A subscription name is required' : undefined,
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
      {/*<div>
          <form.Field
            name='status'
            children={(field) => (
              <>
                <label htmlFor={field.name}>Status:</label>
                <Select name={field.name}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Choose the status...' />
                  </SelectTrigger>
                  <SelectContent>
                    {['active', 'cancelled'].map((value, index) => {
                      return (
                        <SelectItem key={index} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>*/}
      <div>
        <form.Field
          name='category'
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes('error') && 'No "error" allowed in category'
              );
            },
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Category:</label>
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
      {/*<div>
          <form.Field
            name='renewalDate'
            children={(field) => {
              return (
                <>
                  <label htmlFor={field.name}>Renewal Date:</label>
                  <DatePicker date={field.state.value} setDate={() => {}} />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>*/}
      <div>
        <form.Field
          name='monthlyCost'
          validators={{
            onChange: ({ value }) =>
              !value ? 'A monthly cost is required' : undefined,
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Monthly Cost:</label>
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
          name='yearlyCost'
          validators={{
            onChange: ({ value }) =>
              !value ? 'A yearly cost is required' : undefined,
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Yearly Cost:</label>
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
      {/*<div>
          <form.Field
            name='billing'
            children={(field) => (
              <>
                <label htmlFor={field.name}>Billing:</label>
                <Select name={field.name}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Choose the billing type...' />
                  </SelectTrigger>
                  <SelectContent>
                    {['monthly', 'yearly'].map((value, index) => {
                      return (
                        <SelectItem key={index} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </>
            )}
          />
        </div>*/}
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