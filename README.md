# wabi
WebAssembly Backstage Interface

## Setup

### Install [mise](https://mise.jdx.dev/)
```
brew install mise
```

### Install mise tools
```
mise install
```

### Start backstage
```sh
yarn install
yarn dev
```
## Todos

1. Make the HTMX backend available in the proxy section of [app-config.yaml](app-config.yaml) 
```yaml
proxy:
  ### Example for how to add a proxy endpoint for the frontend.
  ### A typical reason to do this is to handle HTTPS and CORS for internal services.
   endpoints:
     '/wabi':
      changeOrigin: true
      target: 'http://127.0.0.1:80'
      secure: true
```
