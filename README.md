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

✨ Simplify and optimize your Node-RED flows with this versatile package! ✨

Effortlessly handle date formatting, math operations, data manipulation, and more—all **in a single node.**

When needed, the following libraries were used sparingly:
- [es-toolkit](https://es-toolkit.slash.page/)
- [radash](https://radash-docs.vercel.app/docs/getting-started)
- [tempo](https://tempo.formkit.com/)

Whenever possible, native Node.js methods take precedence for maximum efficiency.

**One node to rule them all—streamline your flows like never before!**

![paring-config.png](docs/screenshot.png)


## Features

### Array Utilities

#### `Group By` 
 
#### `Key By` 
 
#### `Shuffle` 
 
#### `Sum` 
 
#### `Take` 
 
#### `Take Right` 
 
#### `Toggle` 
 
#### `Unique` 
 

### Async Utilities

#### `Delay` 
 Delays the message by the specified amount of time

### Date Utilities

#### `Current Timezone` 
 Returns the current timezone
#### `Now` 
 Returns the current date with lot of formatting options
#### `Range` 
 Routes messages depending on the time

### Math Utilities

#### `Abs` 
 
#### `Acos` 
 
#### `Asin` 
 
#### `Atan` 
 
#### `Ceil` 
 
#### `Cos` 
 
#### `Exp` 
 
#### `Floor` 
 
#### `Log` 
 
#### `Max` 
 
#### `Mean` 
 
#### `Median` 
 
#### `Min` 
 
#### `Random` 
 
#### `Round` 
 
#### `Sin` 
 
#### `Sum` 
 
#### `Tan` 
 
#### `Trunc` 
 

### Network Utilities

#### `Ip Information` 
 
#### `Ip Version` 
 
#### `Network Interfaces` 
 

### Object Utilities

#### `Get Keys` 
 

### Predicates

#### `Is Boolean` 
 
#### `Is Buffer` 
 
#### `Is Ip` 
 
#### `Is Na N` 
 
#### `Is Nil` 
 
#### `Is Null` 
 
#### `Is Number` 
 
#### `Is String` 
 
#### `Is Undefined` 
 
#### `Is Url` 
 

### String Utilities

#### `Camel Case` 
 
#### `Capitalize` 
 
#### `Constant Case` 
 
#### `Escape` 
 
#### `Kebab Case` 
 
#### `Lower Case` 
 
#### `Lower First` 
 
#### `Pascal Case` 
 
#### `Snake Case` 
 
#### `Start Case` 
 
#### `Trim` 
 
#### `Trim End` 
 
#### `Trim Start` 
 
#### `Unescape` 
 
#### `Upper Case` 
 
#### `Upper First` 
 
#### `Words` 
 

### Utility Functions

#### `Eq` 
 
#### `Gt` 
 
#### `Gte` 
 
#### `Lt` 
 
#### `Lte` 
 
#### `Size` 
 
#### `To Boolean` 
 
#### `To Boolean Number` 
 
#### `To Number` 
 
#### `To Number Non Strict` 
 
#### `To Safe Integer` 
 
#### `To String` 
 


## Performance

All used libraries are treeshaked and included in the final bundle. 

**No extra dependencies are added**

[Very small distribution](https://www.npmjs.com/package/@keload/node-red-contrib-ultimate-toolkit?activeTab=code) size < 40kb.

## Contributing & Developer Experience
This package is built using [node-red-dxp](https://www.npmjs.com/package/@keload/node-red-dxp), offering a blazing-fast and seamless way to develop Node-RED packages. 

Written in **TypeScript**, the codebase is cleanly structured, ensuring maintainability and effortless scalability.

We’re committed to keeping this node alive and thriving, making it a joy to evolve and improve over time. Whether it's refining existing features or adding new capabilities, contributing should always be an enjoyable experience.

Feel free to join the journey—create issues, submit pull requests, or share your ideas. Let’s build something incredible together!

## License

MIT
