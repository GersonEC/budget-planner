export const initialMonthlyBudget: MonthlyBudget = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  budget: 0,
  expenses: 0,
  cashflow: {
    inflow: {
      flows: [],
      totalFlow: 0,
    },
    outflow: {
      flows: [],
      totalFlow: 0,
    },
    netflow: 0,
  },
  bills: [],
};

export const initialCategoryValue: CategoryForm = {
  name: '',
  budget: '',
  expenses: 0,
};

export const initialFlowListValue: FlowList = {
  flows: [],
  totalFlow: 0,
};

export const initialBudgetPlanner: BudgetPlanner = [];

export const initialFinances: PersonalFinance = {
  installmentList: {
    installments: [],
    monthlyTotal: 0,
  },
  subscriptionList: {
    subscriptions: [],
    monthlyTotal: 0,
    yearlyTotal: 0,
  },
  loanList: {
    loans: [],
    monthlyTotal: 0,
  },
};
