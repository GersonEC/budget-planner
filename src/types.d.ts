type Bill = {
  id: string;
  amount: number;
  category: string;
  date: Date;
};

type MonthlyBudget = {
  month: number;
  budget: number;
  bills: Bill[];
};

type CategoryForm = {
  name: string;
  budget: number;
};
