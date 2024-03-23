import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { hostPlugin, HostPage } from '../src/plugin';

createDevApp()
  .registerPlugin(hostPlugin)
  .addPage({
    element: <HostPage />,
    title: 'Root Page',
    path: '/host',
  })
  .render();
