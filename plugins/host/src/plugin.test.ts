import { hostPlugin } from './plugin';

describe('host', () => {
  it('should export plugin', () => {
    expect(hostPlugin).toBeDefined();
  });
});
