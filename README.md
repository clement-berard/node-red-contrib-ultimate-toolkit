# node-red-contrib-ultimate-toolkit

<h3 align="center">The multi-tool for Node-RED, all in one lightweight node.</h3>

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
<table align="center">
  <tr>
    <td align="center">
      <h2>✨ 113</h2>
      <sub><b>Built-in Utilities</b></sub>
    </td>
    <td align="center">
      <h2>🍃 0</h2>
      <sub><b>Runtime Dependencies</b></sub>
    </td>
    <td align="center">
      <h2>🚀 75 kB</h2>
      <sub><b>Bundle Size</b></sub>
    </td>
  </tr>
</table>

## Overview 🔦

✨ Simplify and optimize your Node-RED flows with this versatile package! ✨

Effortlessly handle date formatting, math operations, data manipulation, and more—all **in a single node.**

When needed, the following libraries were used sparingly:
- [es-toolkit](https://es-toolkit.slash.page/)
- [radash](https://radash-docs.vercel.app/docs/getting-started)
- [tempo](https://tempo.formkit.com/)

Whenever possible, native Node.js methods take precedence for maximum efficiency.

**One node to rule them all—streamline your flows like never before!**

![paring-config.png](docs/screenshot.png)

## Installation 📦

```bash
npm install @keload/node-red-contrib-ultimate-toolkit
```

You can also install it directly from the Node-RED editor via **Manage Palette**.

## Performance 🚀

All used libraries are treeshaked and included in the final bundle.

**No extra dependencies are added.**

## Features ✨



### → Array Utilities

| Name | Description |
| --- | --- |
| `Chunk` | Splits the array into groups of the given size |
| `Compact` | Removes falsy values (0, '', null, undefined, false, NaN) |
| `Count By` | Counts items per property value: {value: count} |
| `Drop` | Removes the first N items |
| `Drop Right` | Removes the last N items |
| `Flatten` | Flattens the array by one level |
| `Flatten Deep` | Flattens the array at every depth |
| `Get Random Item` | Returns one random item, null if the array is empty |
| `Group By` | Groups items into an object keyed by the property value |
| `Head` | Returns the first item, null if empty |
| `Initial` | Returns everything except the last item |
| `Key By` | Maps each item to an object keyed by the property value (last wins) |
| `Last` | Returns the last item, null if empty |
| `Max By` | Returns the item with the highest property value, null if empty |
| `Min By` | Returns the item with the lowest property value, null if empty |
| `Order By` | Sorts objects by the property, ascending or descending |
| `Partition` | Splits into [truthy, falsy] arrays based on the property |
| `Sample Size` | Returns N random items, without repeats |
| `Shuffle` | Returns a randomly reordered copy of the array |
| `Sort By` | Sorts objects by the property, ascending |
| `Tail` | Returns everything except the first item |
| `Take` | Returns the first N items |
| `Take Right` | Returns the last N items |
| `Toggle` | Adds the item if absent, removes it if present |
| `Unique` | Removes duplicates, by property value or by simple value if empty |
| `Unzip` | Regroups tuples by position: [[1,'a'],[2,'b']] → [[1,2],['a','b']] |
| `Windowed` | Returns sliding windows of the given size: [1,2,3] with 2 → [[1,2],[2,3]] |

### → Async Utilities

| Name | Description |
| --- | --- |
| `Delay` | Delays the message by the specified amount of time |

### → Date Utilities

| Name | Description |
| --- | --- |
| `Current Timezone` | Returns the current timezone |
| `Format` | Return formatted date from a date |
| `Now` | Returns the current date with lot of formatting options |
| `Time Range` | Routes messages depending on the time |

### → Math Utilities

`Abs` · `Acos` · `Asin` · `Atan` · `Ceil` · `Cos` · `Exp` · `Floor` · `Log` · `Max` · `Mean` · `Median` · `Min` · `Random` · `Round` · `Sin` · `Sum` · `Tan` · `Trunc`

### → Network Utilities

| Name | Description |
| --- | --- |
| `Ip Information` | Fetches detailed information about an IP address |
| `Ip Version` | Returns IP version (4, 6, or 0 if invalid) for a given IP address string |
| `Network Interfaces` | Lists all network interfaces of the current machine (ethernet, wifi, etc.) |

### → Object Utilities

| Name | Description |
| --- | --- |
| `Clone Deep` | Returns a deep copy, independent from the original |
| `Construct` | Rebuilds nesting from dot paths: {'a.b':1} → {a:{b:1}} |
| `Find Key` | Returns the first key holding this value, null if none |
| `Flatten Object` | Flattens nested keys to dot paths: {a:{b:1}} → {'a.b':1} |
| `Get` | Reads a value by path like <code>a.b[0].c</code>, null if missing |
| `Get Keys` | Returns the keys of the object as an array |
| `Invert` | Swaps keys and values: {a:'x'} → {x:'a'} |
| `Listify` | Converts the object to an array of {key, value} |
| `Lowerize` | Converts keys to lower case |
| `Omit` | Removes the listed keys (comma separated) |
| `Pick` | Keeps only the listed keys (comma separated) |
| `Shake` | Removes keys whose value is undefined |
| `Sort Keys` | Returns the object with keys sorted alphabetically |
| `To Camel Case Keys` | Converts keys to camelCase, deeply |
| `To Constant Case Keys` | Converts keys to CONSTANT_CASE, deeply |
| `To Kebab Case Keys` | Converts keys to kebab-case, deeply |
| `To Pascal Case Keys` | Converts keys to PascalCase, deeply |
| `To Snake Case Keys` | Converts keys to snake_case, deeply |
| `Upperize` | Converts keys to upper case |

### → Predicates

`Is Boolean` · `Is Buffer` · `Is Ip` · `Is Na N` · `Is Nil` · `Is Null` · `Is Number` · `Is String` · `Is Undefined` · `Is Url`

### → String Utilities

`Camel Case` · `Capitalize` · `Constant Case` · `Escape` · `Kebab Case` · `Lower Case` · `Lower First` · `Pascal Case` · `Snake Case` · `Start Case` · `Trim` · `Trim End` · `Trim Start` · `Unescape` · `Upper Case` · `Upper First` · `Words`

### → Tools

| Name | Description |
| --- | --- |
| `Cyclic Counter` | A customizable cyclic counter node for Node-RED that iterates through a defined sequence of numbers and can reset after a set timeout. It allows flexible control over the counter's behavior, making it useful in a variety of automation scenarios. |

### → Utility Functions

`Eq` · `Gt` · `Gte` · `Lt` · `Lte` · `Size` · `To Boolean` · `To Boolean Number` · `To Number` · `To Number Non Strict` · `To Safe Integer` · `To String`


## Contributing & Developer Experience
This package is built using [node-red-dxp](https://www.npmjs.com/package/@keload/node-red-dxp), offering a blazing-fast and seamless way to develop Node-RED packages. 

Written in **TypeScript**, the codebase is cleanly structured, ensuring maintainability and effortless scalability.

We’re committed to keeping this node alive and thriving, making it a joy to evolve and improve over time. Whether it's refining existing features or adding new capabilities, contributing should always be an enjoyable experience.

Feel free to join the journey—create issues, submit pull requests, or share your ideas. Let’s build something incredible together!

## License

MIT
