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
  cashflow: Cashflow;
  bills: Bill[];
};

type CategoryForm = {
  name: string;
  budget: number | string;
  expenses: number;
};

type Cashflow = {
  inflow: number;
  outflow: number;
  netflow: number;
};

type Flow = {
  type: 'inflow' | 'outflow';
  name: string;
  quantity: number;
};

type FlowList = {
  flows: Flow[];
  totalFlow: number;
};

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
