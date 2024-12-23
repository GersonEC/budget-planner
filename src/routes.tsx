import React from 'react';
import { Outlet, createRoute, createRootRoute } from '@tanstack/react-router';
//import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import App from './App';
import { MonthSetup } from './pages/MonthSetup';
import { Bills } from './pages/Bills';
import AddBill from './pages/AddBill';
import { Categories } from './pages/Categories';
import { CashFlow } from './pages/Cashflow';
import { Subscriptions } from './pages/Subscriptions';
import { Installments } from './pages/Installments';
import { Loans } from './pages/Loans';
import { Dashboard } from './pages/Dashboard';

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
  component: () => <MonthSetup />,
});

const billsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bills',
  component: () => <Bills />,
});

const addBillRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/add-bill',
  component: () => <AddBill />,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categories',
  component: () => <Categories />,
});

const cashflowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cashflow',
  component: () => <CashFlow />,
});

const subscriptionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subscriptions',
  component: () => <Subscriptions />,
});

const installmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/installments',
  component: () => <Installments />,
});

const loansRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/loans',
  component: () => <Loans />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => <Dashboard />,
});

export const routeTree = rootRoute.addChildren([
  addBillRoute,
  billsRoute,
  categoriesRoute,
  cashflowRoute,
  subscriptionsRoute,
  installmentsRoute,
  loansRoute,
  dashboardRoute,
  indexRoute,
]);
