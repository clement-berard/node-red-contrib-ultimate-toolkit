# node-red-contrib-ultimate-toolkit

A collection of utilities to help you build your Node-RED flows.

<br/>
<p align="center">
  <a href="https://www.npmjs.com/package/@keload/node-red-dxp" aria-label="Build with node-red-dxp">
    <img src="https://img.shields.io/badge/Build%20with-node--red--dxp-blue?style=for-the-badge" alt="Build with node-red-dxp">
  </a>
</p>
<p align="center">
    <a href="https://github.com/clement-berard/node-red-contrib-ultimate-toolkit/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/clement-berard/node-red-contrib-ultimate-toolkit.svg?style=for-the-badge" alt="Contributors">
    </a>
    <a href="https://github.com/clement-berard/node-red-contrib-ultimate-toolkit/network/members">
        <img src="https://img.shields.io/github/forks/clement-berard/node-red-contrib-ultimate-toolkit.svg?style=for-the-badge" alt="Forks">
    </a>
    <a href="https://github.com/clement-berard/node-red-contrib-ultimate-toolkit/stargazers">
        <img src="https://img.shields.io/github/stars/clement-berard/node-red-contrib-ultimate-toolkit.svg?style=for-the-badge" alt="Stargazers">
    </a>
    <a href="https://github.com/clement-berard/node-red-contrib-ultimate-toolkit/issues">
        <img src="https://img.shields.io/github/issues/clement-berard/node-red-contrib-ultimate-toolkit.svg?style=for-the-badge" alt="Issues">
    </a>
</p>
<p align="center">
  <a aria-label="NPM Version" href="https://www.npmjs.com/package/@keload/node-red-contrib-ultimate-toolkit">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@keload/node-red-contrib-ultimate-toolkit.svg?label=NPM&logo=npm&style=for-the-badge&color=0470FF&logoColor=white">
  </a>
  <a aria-label="NPM Download Count" href="https://www.npmjs.com/package/@keload/node-red-contrib-ultimate-toolkit">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/@keload/node-red-contrib-ultimate-toolkit?label=Downloads&style=for-the-badge&color=67ACF3">
  </a>
</p>

## Overview

This package provides a set of utilities to help you build your Node-RED flows.

Convert, format, and manipulate your data with ease.

Essentially based on [es-toolkit](https://es-toolkit.slash.page/) and [radash](https://radash-docs.vercel.app/docs/getting-started)

If native Node.js are available, they are used instead of the libraries.

**One node to rule them all!**

![paring-config.png](docs/screenshot.png)


## Features

### Array Utilities

- `groupBy`
- `keyBy`
- `shuffle`
- `sum`
- `take`
- `takeRight`
- `toggle`
- `unique`

### Async Utilities

- `delay`

### Math Utilities

- `abs`
- `acos`
- `asin`
- `atan`
- `ceil`
- `cos`
- `exp`
- `floor`
- `log`
- `max`
- `mean`
- `median`
- `min`
- `random`
- `round`
- `sin`
- `sum`
- `tan`
- `trunc`

### Network Utilities

- `ipInformation`
- `ipVersion`
- `networkInterfaces`

### Object Utilities

- `getKeys`

### Predicates

- `isBoolean`
- `isBuffer`
- `isIp`
- `isNaN`
- `isNil`
- `isNull`
- `isNumber`
- `isString`
- `isUndefined`
- `isUrl`

### String Utilities

- `camelCase`
- `capitalize`
- `constantCase`
- `escape`
- `kebabCase`
- `lowerCase`
- `lowerFirst`
- `pascalCase`
- `snakeCase`
- `startCase`
- `trim`
- `trimEnd`
- `trimStart`
- `unescape`
- `upperCase`
- `upperFirst`
- `words`

### Utility Functions

- `eq`
- `gt`
- `gte`
- `lt`
- `lte`
- `now`
- `size`
- `toBoolean`
- `toBooleanNumber`
- `toNumber`
- `toNumberNonStrict`
- `toSafeInteger`
- `toString`

## Performance

All used libraries are treeshaked and included in the final bundle. 

**No extra dependencies are added**

[Very small distribution](https://www.npmjs.com/package/@keload/node-red-contrib-ultimate-toolkit?activeTab=code) size < 30kb.

## Contributing

This package use [node-red-dxp](https://www.npmjs.com/package/@keload/node-red-dxp) to build the package.
A crazy fast and easy way to build Node-RED package.

Please feel free to contribute to this package by creating issues or pull requests.

## License

MIT
