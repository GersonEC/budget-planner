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
import { BudgetSetup } from './BudgetSetup';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { useNavigate } from '@tanstack/react-router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const monthSetupSchema = z.object({
  inflow: z.object({
    flows: z.array(
      z.object({
        type: z.union([z.literal('inflow'), z.literal('outflow')]),
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
        type: z.union([z.literal('inflow'), z.literal('outflow')]),
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
  const [budget, setBudget] = useState<number | string>('');
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const navigate = useNavigate();
  const wizardTitle =
    step === 1
      ? 'Add your Inflows'
      : step === 2
      ? 'Add your Outflows'
      : 'Set a Budget';

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

    onSubmit: async () => {
      const newMonthSetup: MonthSetup = {
        inflow: {
          flows: monthlyBudget.cashflow.inflow.flows,
          totalFlow: monthlyBudget.cashflow.inflow.totalFlow,
        },
        outflow: {
          flows: monthlyBudget.cashflow.outflow.flows,
          totalFlow: monthlyBudget.cashflow.outflow.totalFlow,
        },
        budget: Number(budget),
      };
      console.log({ newMonthSetup });

      const updatedMonthlyBudget: MonthlyBudget = {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        budget: newMonthSetup.budget,
        expenses: 0,
        bills: [],
        cashflow: {
          inflow: newMonthSetup.inflow,
          outflow: newMonthSetup.outflow,
          netflow:
            newMonthSetup.inflow.totalFlow - newMonthSetup.outflow.totalFlow,
        },
      };

      console.log({ updatedMonthlyBudget });

      //Send data to backend here
      /*const response = await fetch('http://localhost:3000/api/monthly-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Inform the server about the content type
        },
        body: JSON.stringify(updatedMonthlyBudget),
      });
      console.log({ response });*/

      setMonthlyBudget(updatedMonthlyBudget);
      navigate({
        to: '/bills',
      });
    },
  });

  const handleSetBudget = (newBudget: number) => {
    setBudget(Number(newBudget));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle className='text-gray-300'>{wizardTitle}</CardTitle>
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
          {step === 3 && (
            <BudgetSetup budget={budget} setBudget={handleSetBudget} />
          )}
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
            <Button disabled={budget === ''} type='submit'>
              Submit
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
