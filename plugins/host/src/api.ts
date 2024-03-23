import {createApiRef, DiscoveryApi} from '@backstage/core-plugin-api';

export interface WabiApi {
     getUrl: () => Promise<String>;
}

export const wabiApiRef = createApiRef<WabiApi>({
    id: 'plugin.wabi.service',
});

export class WabiApiClient implements WabiApi {
    discoveryApi: DiscoveryApi;


    constructor({discoveryApi}: { discoveryApi: DiscoveryApi }) {
        this.discoveryApi = discoveryApi;
    }

    async getUrl(): Promise<String> {
        return this.discoveryApi.getBaseUrl("proxy");
    }


}