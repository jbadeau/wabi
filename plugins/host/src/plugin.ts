import {createApiFactory, createPlugin, createRoutableExtension, discoveryApiRef,} from '@backstage/core-plugin-api';

import {rootRouteRef} from './routes';
import {WabiApiClient, wabiApiRef} from "./api";

export const hostPlugin = createPlugin({
  id: 'host',
  routes: {
    root: rootRouteRef,
  },
    apis: [
        createApiFactory({
            api: wabiApiRef,
            deps: { discoveryApi: discoveryApiRef },
            factory: ({ discoveryApi }) => new WabiApiClient({ discoveryApi }),
        }),
    ],
});

export const HostPage = hostPlugin.provide(
  createRoutableExtension({
    name: 'HostPage',
    component: () =>
      import('./components/host').then(m => m.HostComponent),
    mountPoint: rootRouteRef,
  }),
);
