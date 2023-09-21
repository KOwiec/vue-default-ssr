#  vue-default-ssr 
<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.3.4-brightgreen.svg" alt="vue">
  </a>  
  <a href="https://github.com/vitejs/vite">
      <img src="https://img.shields.io/badge/vite-4.4.9-brightgreen.svg" alt="adminlte3">
  </a>  
<a href="https://github.com/vuejs/vuex">
    <img src="https://img.shields.io/badge/vuex-4.1.0-brightgreen.svg" alt="element-ui">
  </a>
<a href="https://github.com/expressjs/express">
    <img src="https://img.shields.io/badge/express-4.18.2-brightgreen.svg" alt="element-ui">
  </a>   
  <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
    </a>  
</p>


This template should help get you started developing with Vue 3 in Vite with Server-Side Rendering (SSR).
Example project - [Vite + Vue3 ]( https://github.com/vitejs/vite/tree/v2/packages/playground/ssr-vue)

## Quick start

See: [Vite guide for Server-Side Rendering ]( https://vitejs.dev/guide/ssr.html).

## Project Setup - install dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development.  See:[ HMR  ]( https://vitejs.dev/guide/features.html#hot-module-replacement)

```sh
npm run dev
```

### Compile and Minify for Production. See: [ bulding for production  ](https://v2.vitejs.dev/guide/build.html)

```sh
npm run build
```

### Compile and test application locally.  See:[ testing locally  ](https://vitejs.dev/guide/static-deploy.html#testing-the-app-locally)

```sh
npm run preview
```

### Compile SSR app for Development.  See:[ Dev Server  ]( https://v2.vitejs.dev/guide/ssr.html#setting-up-the-dev-server)

```sh
npm run node:dev-server  or  npm run node:server
```

### Compile SSR app for Production. See: [ SSR for production  ](https://v2.vitejs.dev/guide/ssr.html#building-for-production)

```sh
npm run build:two
```
NOTE: before run this script and two next, delete /dist directory, if existed, for watch changes.

### Pre-Rendering / Static-Site Generation (SSG). See: [ pre-rendering  ](https://v2.vitejs.dev/guide/ssr.html#pre-rendering-ssg)

```sh
npm run generate
```

### SSR Externals dependencies. See: [ external  ](https://v2.vitejs.dev/guide/ssr.html#ssr-externals)

```sh
npm run build:noExternal
```
