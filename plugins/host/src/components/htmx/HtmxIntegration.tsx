import React, { useEffect, useRef } from 'react';
import * as htmx from 'htmx.org';

export const HtmxIntegration = () => {
  const htmxTarget = useRef(null);

  useEffect(() => {
    // Ensure HTMX is initialized for this component if needed
    if (htmxTarget.current) {
      htmx.process(htmxTarget.current);
    }

    // Cleanup if the component unmounts
    return () => {
      if (htmxTarget.current) {
        htmx.remove(htmxTarget.current);
      }
    };
  }, []);

  return (
      <div>
        <div ref={htmxTarget}>
          {/* This button uses HTMX to load content into the div below. Ensure the server responds appropriately. */}
          <button
              hx-get="/api/proxy/api/data"
              hx-trigger="click"
              hx-target="#content-target"
              hx-swap="outerHTML"
          >
            Load Data
          </button>
        </div>
        <div id="content-target">
          Content will be loaded here by HTMX.
        </div>
      </div>
  );
};

