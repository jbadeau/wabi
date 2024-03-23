import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

/**
 * remotePlugin backend plugin
 *
 * @public
 */
export const remotePlugin = createBackendPlugin({
  pluginId: 'remotePlugin',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
      },
      async init({
        httpRouter,
        logger,
      }) {
        httpRouter.use(
          await createRouter({
            logger,
          }),
        );
      },
    });
  },
});
