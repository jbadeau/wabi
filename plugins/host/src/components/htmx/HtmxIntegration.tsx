import React, { useEffect, useState } from 'react';
import * as htmx from 'htmx.org';
import { identityApiRef, useApi } from '@backstage/core-plugin-api';

export const HtmxIntegration = () => {
    const identityApi = useApi(identityApiRef);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const credentials = await identityApi.getCredentials();
                setToken(credentials.token);
            } catch (error) {
                console.error('Error fetching credentials:', error);
            }
        };

        fetchCredentials();
    }, [identityApi]);

    useEffect(() => {
        if (token) {
            const configRequestListener = (configEvent) => {
                configEvent.detail.headers['Authorization'] = `Bearer ${token}`;
                configEvent.detail.path = `http://localhost:7007/api/proxy${event.detail.path}`
            };

            document.body.addEventListener("htmx:configRequest", configRequestListener);

            return () => {
                document.body.removeEventListener("htmx:configRequest", configRequestListener);
            };
        }
    }, [token]);

    useEffect(() => {
        const htmxTarget = document.getElementById('htmx-target');

        if (htmxTarget) {
            htmx.process(htmxTarget);
        }

        return () => {
            if (htmxTarget) {
                htmx.remove(htmxTarget);
            }
        };
    }, [token]);

    if (!token) {
        return null;
    }

    return (
        <div>
            <div id="htmx-target">
                {/* This div will trigger the HTMX request onload */}
                <div
                    hx-get="/wabi"
                    hx-trigger="load"
                    hx-target="#content-target"
                    hx-swap="outerHTML"
                    style={{ display: 'none' }}
                />
            </div>
            <div id="content-target">
                Content will be loaded here by HTMX.
            </div>
        </div>
    );
};
