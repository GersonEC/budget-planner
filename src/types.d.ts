type Bill = {
  id: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
};

type CategoryForm = {
  name: string;
  budget: number | string;
  expenses: number;
};

type Inflow = {
  name: string;
  quantity: number;
};

type Outflow = {
  name: string;
  quantity: number;
  expenses: number;
};

type InflowList = {
  flows: Inflow[];
  totalFlow: number;
};

type OutflowList = {
  flows: Outflow[];
  totalFlow: number;
};

type Cashflow = {
  inflow: InflowList;
  outflow: OutflowList;
  netflow: number;
};

type MonthlyBudget = {
  month: number;
  year: number;
  budget: number;
  expenses: number;
  cashflow: Cashflow;
  bills: Bill[];
};

type BudgetPlanner = MonthlyBudget[];

type Subscription = {
  name: string;
  status: 'active' | 'canceled';
  category: string;
  renewalDate: Date;
  monthlyCost: number;
  yearlyCost: number;
  billing: 'monthly' | 'yearly';
};

type SubscriptionList = {
  subscriptions: Subscription[];
  monthlyTotal: number;
  yearlyTotal: number;
};

type Installment = {
  name: string;
  monthlyCost: number;
};

type InstallmentList = {
  installments: Installment[];
  monthlyTotal: number;
};

type Loan = {
  borrower: string;
  quantity: number;
  dividend: number;
};

type LoanList = {
  loans: Loan[];
  monthlyTotal: number;
};

type PersonalFinance = {
  subscriptionList: SubscriptionList;
  installmentList: InstallmentList;
  loanList: LoanList;
};

type LoadingStatus = 'idle' | 'loading' | 'success';
