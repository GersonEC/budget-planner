import React from 'react';
import { Outlet, createRoute, createRootRoute } from '@tanstack/react-router';
//import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import App from './App';

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
  component: () => <h1>Categories setup</h1>,
});

const detailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/budget',
  component: () => <h1>Budget Setup</h1>,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bills',
  component: () => <h1>Month Bills</h1>,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  detailsRoute,
  profileRoute,
]);
