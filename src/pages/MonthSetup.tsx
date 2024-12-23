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
import { usePersonalFinance } from '../context/PersonalFinanceContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

export const MonthSetup = () => {
  const { toast } = useToast();
  const [budget, setBudget] = useState<number | string>('');
  const { categories, setCategories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const [isThereCashflow, setIsThereCashflow] = useState<boolean>(false);
  const [isOutflowDialogOpen, setIsOutflowDialogOpen] =
    useState<boolean>(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
    useState<boolean>(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { finances } = usePersonalFinance();
  const installmentList: InstallmentList = finances.installmentList;

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
        outflow: {
          ...monthlyBudget.cashflow.outflow,
          totalFlow:
            monthlyBudget.cashflow.outflow.totalFlow +
            installmentList.monthlyTotal,
        },
        netflow:
          monthlyBudget.cashflow.inflow.totalFlow -
          (monthlyBudget.cashflow.outflow.totalFlow +
            installmentList.monthlyTotal),
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

  const renderShowOutflows = () => {
    return (
      <Dialog
        open={isOutflowDialogOpen}
        onOpenChange={() => setIsOutflowDialogOpen(!isOutflowDialogOpen)}
      >
        <DialogTrigger
          className='hover:underline text-orange-400 text-sm'
          onClick={() => setIsOutflowDialogOpen(true)}
        >
          check your outflows
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Outflows</DialogTitle>
            <div className='flex flex-wrap gap-2 justify-center'>
              {monthlyBudget.cashflow.outflow.flows.map((outflow) => (
                <div
                  key={outflow.name}
                  className='border border-slate-400 rounded py-1 px-2 flex items-center gap-2'
                >
                  <span>📤 </span>
                  {outflow.name}: {currencyFormat(outflow.quantity)}
                </div>
              ))}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  const renderShowCategories = () => {
    return (
      <Dialog
        open={isCategoryDialogOpen}
        onOpenChange={() => setIsCategoryDialogOpen(!isCategoryDialogOpen)}
      >
        <DialogTrigger
          className='hover:underline text-orange-400 text-sm'
          onClick={() => setIsCategoryDialogOpen(true)}
        >
          check your categories
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Categories</DialogTitle>
            <div className='flex flex-wrap gap-2 justify-center'>
              {categories.map((category) => (
                <div
                  key={category.name}
                  className='border border-slate-400 rounded py-1 px-2 flex items-center gap-2'
                >
                  <span>📊 </span>
                  {category.name}: {currencyFormat(Number(category.budget))}
                  <Button
                    variant={'ghost'}
                    onClick={() => handleRemoveCategory(category.name)}
                  >
                    ⛔️
                  </Button>
                </div>
              ))}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className='flex flex-col gap-6 p-4 max-w-4xl'>
      <Heading variant='title'>
        Month Setup - {getCurrentMonthInString()}
      </Heading>
      {isThereCashflow ? (
        <CashFlow />
      ) : (
        <div className='border rounded p-4'>
          <Heading variant='subtitle'>Cashflow Setting</Heading>
          <div className='flex flex-col'>
            <FlowForm type='inflow' handleSubmit={handleFlowSubmit} />
            <FlowForm type='outflow' handleSubmit={handleFlowSubmit} />
            {renderShowOutflows()}
          </div>
        </div>
      )}
      <div className='border rounded p-4'>
        <Heading variant='subtitle'>Budget Setting</Heading>
        <BudgetSetup budget={budget} setBudget={handleSetBudget} />
      </div>
      <div className='border rounded p-4'>
        <Heading variant='subtitle'>Categories Setting</Heading>
        <div className='flex flex-col items-center gap-4'>
          <CategoriesSetup
            categories={categories}
            addCategory={handleAddCategory}
            copyFromOutflow={handleCopyFromOutflow}
            removeCategory={handleRemoveCategory}
            isOpen={isCategoryModalOpen}
            setIsOpen={(isOpen) => setIsCategoryModalOpen(isOpen)}
          />
          {renderShowCategories()}
        </div>
      </div>

      <Button onClick={handleProceed}>Proceed</Button>
    </div>
  );
};
