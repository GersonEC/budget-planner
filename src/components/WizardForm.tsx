'use client';

import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { InflowForm } from './InflowForm';
import { OutflowForm } from './OutflowForm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const monthSetupSchema = z.object({
  inflow: z.object({
    flows: z.array(
      z.object({
        type: z.literal('inflow'),
        name: z.string().min(1, {
          message: 'Your inflow name must be greather than 0',
        }),
        quantity: z.number().min(1, {
          message: 'Your inflow must be greather than 0',
        }),
      })
    ),
    totalFlow: z.number().min(0),
  }),
  outflow: z.object({
    flows: z.array(
      z.object({
        type: z.literal('outflow'),
        name: z.string().min(1, {
          message: 'Your outflow must be greather than 0',
        }),
        quantity: z.number().min(1, {
          message: 'Your outflow must be greather than 0',
        }),
      })
    ),
    totalFlow: z.number().min(0),
  }),
  budget: z.number().min(0, {
    message: 'Your budget must be greather than 0',
  }),
});

type MonthSetup = z.infer<typeof monthSetupSchema>;

export const WizardForm = () => {
  const [step, setStep] = useState(1);
  /*const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
      occupation: '',
      interests: [],
    },
  });*/

  const form = useForm({
    defaultValues: {
      inflow: {
        flows: [],
        totalFlow: 0,
      },
      outflow: {
        flows: [],
        totalFlow: 0,
      },
      budget: 0,
    } as MonthSetup,

    onSubmit: async ({ value }) => {
      const newMonthSetup: MonthSetup = {
        inflow: {
          flows: value.inflow.flows,
          totalFlow: value.inflow.totalFlow,
        },
        outflow: {
          flows: value.outflow.flows,
          totalFlow: value.outflow.totalFlow,
        },
        budget: value.budget,
      };
      console.log({ newMonthSetup });
    },
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Wizard Form - Step {step}</CardTitle>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <CardContent>
          {step === 1 && <InflowForm />}
          {step === 2 && <OutflowForm />}
          {step === 3 && <h1>Step 3</h1>}
        </CardContent>
        <CardFooter className='flex justify-between'>
          {step > 1 && (
            <Button type='button' variant='outline' onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button type='button' onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type='submit'>Submit</Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
