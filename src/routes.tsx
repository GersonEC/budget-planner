import React from 'react';
import { Outlet, createRoute, createRootRoute } from '@tanstack/react-router';
//import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import App from './App';
import { MonthSetup } from './pages/MonthSetup';
import { Bills } from './pages/Bills';
import AddBill from './pages/AddBill';

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

export const routeTree = rootRoute.addChildren([
  indexRoute,
  billsRoute,
  addBillRoute,
]);
