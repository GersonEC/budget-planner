import { useCategories } from '../context/CategoriesContext';
import { useMonthlyBudget } from '../context/MonthlyBudgetContext';
import { BudgetSetup } from '../components/BudgetSetup';
import { CategoriesSetup } from '../components/CategoriesSetup';
import { Button } from '../components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FlowForm } from '../components/FlowForm';
import { Heading } from '../components/Heading';
import { currencyFormat, getCurrentMonthInString } from '../lib/utils';
import { useToast } from '../hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { HandCoins, Trash2 } from 'lucide-react';

export const MonthSetup = () => {
  const { toast } = useToast();
  const [budget, setBudget] = useState<number | string>('');
  const { categories, setCategories } = useCategories();
  const { monthlyBudget, setMonthlyBudget } = useMonthlyBudget();
  const [isOutflowDialogOpen, setIsOutflowDialogOpen] =
    useState<boolean>(false);
  const [isInflowDialogOpen, setIsInflowDialogOpen] = useState<boolean>(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
    useState<boolean>(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const outflows = monthlyBudget.cashflow.outflow.flows;
  const inflows = monthlyBudget.cashflow.inflow.flows;

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
          totalFlow: monthlyBudget.cashflow.outflow.totalFlow,
          //installmentList.monthlyTotal,
        },
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
        <DialogContent className='min-h-max h-1/4 w-11/12'>
          <DialogHeader>
            <DialogTitle>Outflows</DialogTitle>
            <div className='flex flex-wrap gap-2 justify-center'>
              {outflows.length === 0 ? (
                <div className='flex flex-1 items-center justify-center mt-8'>
                  There are no outflows to show.
                </div>
              ) : (
                outflows.map((outflow) => (
                  <div
                    key={outflow.name}
                    className='border border-slate-400 rounded py-1 px-2 flex items-center gap-2 mt-4'
                  >
                    <HandCoins className='text-red-400' />
                    {outflow.name}: {currencyFormat(outflow.quantity)}
                    <Trash2
                      className='w-5 text-slate-400 hover:text-red-400'
                      onClick={() => handleRemoveFlow('outflow', outflow)}
                    />
                  </div>
                ))
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  const handleRemoveFlow = (type: 'inflow' | 'outflow', flow: Flow) => {
    const newFlows = monthlyBudget.cashflow[type].flows.filter(
      (f) => f.name !== flow.name
    );
    const updatedMonthlyBudget: MonthlyBudget = {
      ...monthlyBudget,
      cashflow: {
        ...monthlyBudget.cashflow,
        [type]: {
          flows: newFlows,
          totalFlow: monthlyBudget.cashflow[type].totalFlow - flow.quantity,
        },
      },
    };
    setMonthlyBudget(updatedMonthlyBudget);
  };

  const renderShowInflows = () => {
    return (
      <Dialog
        open={isInflowDialogOpen}
        onOpenChange={() => setIsInflowDialogOpen(!isInflowDialogOpen)}
      >
        <DialogTrigger
          className='hover:underline text-orange-400 text-sm'
          onClick={() => setIsInflowDialogOpen(true)}
        >
          check your inflows
        </DialogTrigger>
        <DialogContent className='min-h-max h-1/4 w-11/12'>
          <DialogHeader>
            <DialogTitle>Inflows</DialogTitle>
            <div className='flex flex-wrap gap-2 justify-center pt-4'>
              {inflows.length === 0 ? (
                <div className='flex flex-1 items-center justify-center mt-8'>
                  There are no inflows to show.
                </div>
              ) : (
                inflows.map((inflow) => (
                  <div key={inflow.name} className=' flex items-center gap-2'>
                    <HandCoins className='text-green-400' />
                    {inflow.name}: {currencyFormat(inflow.quantity)}
                    <Trash2
                      className='w-5 text-slate-400 hover:text-red-400'
                      onClick={() => handleRemoveFlow('inflow', inflow)}
                    />
                  </div>
                ))
              )}
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
        <DialogContent className='min-h-max h-1/4 w-11/12'>
          <DialogHeader>
            <DialogTitle>Categories</DialogTitle>
            <div className='flex flex-wrap gap-2 justify-center'>
              {categories.length === 0 ? (
                <div className='flex flex-1 items-center justify-center mt-8'>
                  There are no categories to show.
                </div>
              ) : (
                categories.map((category) => (
                  <div className='flex gap-1' key={category.name}>
                    <div className='border border-slate-400 rounded py-1 px-2 flex items-center gap-2'>
                      <span>📊 </span>
                      {category.name}: {currencyFormat(Number(category.budget))}
                    </div>
                    <Button
                      variant={'ghost'}
                      onClick={() => handleRemoveCategory(category.name)}
                    >
                      ❌
                    </Button>
                  </div>
                ))
              )}
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
      <div className='border rounded p-4 shadow-xl'>
        <Heading variant='subtitle'>Cashflow Setting</Heading>
        <div className='flex flex-col'>
          <FlowForm type='inflow' handleSubmit={handleFlowSubmit} />
          {inflows.length > 0 && renderShowInflows()}
          <FlowForm type='outflow' handleSubmit={handleFlowSubmit} />
          {outflows.length > 0 && renderShowOutflows()}
        </div>
      </div>

      <div className='border rounded p-4 shadow-xl'>
        <Heading variant='subtitle'>Budget Setting</Heading>
        <BudgetSetup budget={budget} setBudget={handleSetBudget} />
      </div>
      <div className='border rounded p-4 shadow-xl'>
        <Heading variant='subtitle'>Categories Setting</Heading>
        <div className='flex flex-col items-center gap-4 shadow-xl'>
          <CategoriesSetup
            categories={categories}
            addCategory={handleAddCategory}
            copyFromOutflow={handleCopyFromOutflow}
            removeCategory={handleRemoveCategory}
            isOpen={isCategoryModalOpen}
            setIsOpen={(isOpen) => setIsCategoryModalOpen(isOpen)}
          />
          {categories.length > 0 && renderShowCategories()}
        </div>
      </div>

      <Button onClick={handleProceed}>Proceed</Button>
    </div>
  );
};
