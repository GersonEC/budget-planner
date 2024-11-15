import { useCategories } from '../context/CategoriesContext';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { BudgetSetup } from '../components/BudgetSetup';
import { CategoriesSetup } from '../components/CategoriesSetup';
import { Button } from '../components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FlowForm } from '../components/FlowForm';
import { CashFlow } from './Cashflow';
import { Heading } from '../components/Heading';
import { currencyFormat, getCurrentMonthInString } from '../lib/utils';
import { useToast } from '../hooks/use-toast';

export const MonthSetup = () => {
  const { toast } = useToast();
  const [budget, setBudget] = useState<number | string>('');
  const { categories, setCategories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const [isThereCashflow, setIsThereCashflow] = useState<boolean>(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const inflowsInSessionStorage = localStorage.getItem('inflow');
    const outflowsInSessionStorage = localStorage.getItem('outflow');
    if (inflowsInSessionStorage && outflowsInSessionStorage) {
      setIsThereCashflow(true);
    }
  }, []);

  const handleSetBudget = (newBudget: number) => {
    setBudget(newBudget);
  };

  const handleAddCategory = (category: CategoryForm) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    setIsCategoryModalOpen(false);
    toast({
      variant: 'success',
      title: 'Category added successfully',
      description: `Category added: ${category.name} - ${currencyFormat(
        Number(category.budget)
      )}`,
    });
  };

  const handleRemoveCategory = (categoryName: string) => {
    const newCategories = categories.filter((c) => c.name !== categoryName);
    setCategories(newCategories);
  };

  const handleCopyFromOutflow = () => {
    const outflowsInSessionStorage = localStorage.getItem('outflow');
    if (outflowsInSessionStorage) {
      const outflows = JSON.parse(outflowsInSessionStorage) as FlowList;
      const newCategories: CategoryForm[] = [];
      outflows.flows.forEach((flow) => {
        const category: CategoryForm = {
          name: flow.name,
          budget: flow.quantity,
          expenses: 0,
        };
        newCategories.push(category);
      });
      setCategories(newCategories);
      toast({
        variant: 'success',
        title: 'Elements copied from outflow',
        description: 'The categories has been added correctly.',
      });
    }
  };

  const handleProceed = () => {
    if (!budget) {
      alert('Please enter a budget');
      return;
    }
    const updatedMonthlyBudget: MonthlyBudget = {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      budget: Number(budget),
      expenses: 0,
      bills: [],
      cashflow: {
        ...monthlyBudget.cashflow,
        netflow:
          monthlyBudget.cashflow.inflow.totalFlow -
          monthlyBudget.cashflow.outflow.totalFlow,
      },
    };
    setMonthlyBudget(updatedMonthlyBudget);
    navigate({
      to: '/bills',
    });
  };

  const handleFlowSubmit = (type: 'inflow' | 'outflow', flowList: FlowList) => {
    let updatedMonthlyBudget: MonthlyBudget;
    if (type === 'inflow') {
      updatedMonthlyBudget = {
        ...monthlyBudget,
        cashflow: {
          ...monthlyBudget.cashflow,
          inflow: flowList,
        },
      };
    } else {
      updatedMonthlyBudget = {
        ...monthlyBudget,
        cashflow: {
          ...monthlyBudget.cashflow,
          outflow: flowList,
        },
      };
    }
    setMonthlyBudget(updatedMonthlyBudget);
  };

  return (
    <div className='flex flex-col gap-6 border p-4 max-w-4xl'>
      <Heading variant='title' className='m-auto'>
        Month Setup - {getCurrentMonthInString()}
      </Heading>
      {isThereCashflow ? (
        <CashFlow />
      ) : (
        <div>
          <Heading variant='subtitle'>Cashflow Setting</Heading>
          <h2>Inflow</h2>
          <FlowForm type='inflow' handleSubmit={handleFlowSubmit} />
          <h2>Outflow</h2>
          <FlowForm type='outflow' handleSubmit={handleFlowSubmit} />
        </div>
      )}
      <Heading variant='subtitle'>Budget Setting</Heading>
      <BudgetSetup budget={budget} setBudget={handleSetBudget} />
      <Heading variant='subtitle'>Categories Setting</Heading>
      <CategoriesSetup
        categories={categories}
        addCategory={handleAddCategory}
        copyFromOutflow={handleCopyFromOutflow}
        removeCategory={handleRemoveCategory}
        isOpen={isCategoryModalOpen}
        setIsOpen={(isOpen) => setIsCategoryModalOpen(isOpen)}
      />
      <Button onClick={handleProceed}>Proceed</Button>
    </div>
  );
};
