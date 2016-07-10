import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { Home } from './modules/home';
import { Services } from './modules/services'
import { NoContent } from './modules/no-content';

import { DataResolver } from './app.resolver';

export const routes: RouterConfig = <RouterConfig>[
  {
    path: '', component: Home
  },
  {
    path: 'home', component: Home
  },
  // make sure you match the component type string to the require in asyncRoutes
  {
    path: 'about-us', component: Home,
  },
  {
    path: 'services', component: Services,
  },
  // async components with children routes must use WebpackAsyncRoute
  {
    path: 'detail', component: 'Detail',
    canActivate: [WebpackAsyncRoute],
    children: [
      {path: '', component: 'Index'}  // must be included
    ]
  },
  {path: '**', component: NoContent},
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

export const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  'About': require('es6-promise-loader!./modules/about'),
  'Detail': require('es6-promise-loader!./modules/+detail'),
  'Index': require('es6-promise-loader!./modules/+detail'), // must be exported with detail/index.ts
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  asyncRoutes['About'],
  asyncRoutes['Detail'],
   // es6-promise-loader returns a function
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
