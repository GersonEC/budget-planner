import React from 'react';
import { Outlet, createRoute, createRootRoute } from '@tanstack/react-router';
//import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import App from './App';
import { CategoriesSetup } from './components/CategoriesSetup';
import { BudgetSetup } from './components/BudgetSetup';
import { MonthlyBills } from './components/MonthlyBills';

export const rootRoute = createRootRoute({
  component: () => (
    <React.Fragment>
      <App>
        <Outlet />
      </App>
      {/*<TanStackRouterDevtools />*/}
    </React.Fragment>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <CategoriesSetup />,
});

const budgetSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/budget',
  component: () => <BudgetSetup />,
});

const monthlyBillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bills',
  component: () => <MonthlyBills />,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  budgetSetupRoute,
  monthlyBillsRoute,
]);
