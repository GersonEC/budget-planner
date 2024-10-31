type Bill = {
  id: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
};

type MonthlyBudget = {
  month: number;
  budget: number;
  expenses: number;
  bills: Bill[];
};

type CategoryForm = {
  name: string;
  budget: number;
  expenses: number;
};

type Flow = {
  type: 'inflow' | 'outflow';
  name: string;
  quantity: number;
};
