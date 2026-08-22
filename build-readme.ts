import * as fs from 'node:fs';
import * as path from 'node:path';
import { alphabetical, title } from 'radash';
import pkg from './package.json';
import { list } from './src/lib/client-side/list';

const getDirectorySizeBytes = (dirPath: string): number => {
  let total = 0;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name);
    total += entry.isDirectory() ? getDirectorySizeBytes(entryPath) : fs.statSync(entryPath).size;
  }
  return total;
};

const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  throw new Error(
    `Cannot compute bundle size: "${distPath}" does not exist. Run "pnpm build" before "pnpm generate:readme".`,
  );
}
const bundleSizeKb = Math.round(getDirectorySizeBytes(distPath) / 1024);

const dependenciesCount = Object.keys((pkg as { dependencies?: Record<string, string> }).dependencies ?? {}).length;

const featuresCount = Object.values(list).reduce((acc, catFns) => acc + Object.keys(catFns).length, 0);

const statCard = (emoji: string, value: string, label: string) => `    <td align="center">
      <h2>${emoji} ${value}</h2>
      <sub><b>${label}</b></sub>
    </td>`;

const statCardsPart = `<table align="center">
  <tr>
${statCard('✨', `${featuresCount}`, 'Built-in Utilities')}
${statCard('🍃', `${dependenciesCount}`, 'Runtime Dependencies')}
${statCard('🚀', `${bundleSizeKb} kB`, 'Bundle Size')}
  </tr>
</table>`;

const sortByKey = (obj: Record<string, unknown>) => {
  return Object.fromEntries(Object.entries(obj).sort((a, b) => a[0].localeCompare(b[0])));
};

const allCategories = alphabetical(Object.keys(list), (f) => f);

const finalFeatures = [];

for (const cat of allCategories) {
  const catTitle = title(cat);
  const catFns = sortByKey(list[cat]);
  const finalCatFns = [];
  for (const [key, value] of Object.entries(catFns)) {
    finalCatFns.push({
      name: title(key),
      // @ts-expect-error
      description: value?.description || '',
    });
  }
  finalFeatures.push({
    title: catTitle,
    finalCatFns,
  });
}

const featurePart = `
${finalFeatures
  .map((cat) => {
    const hasDescriptions = cat.finalCatFns.some((v) => v.description);
    if (!hasDescriptions) {
      const pills = cat.finalCatFns.map((v) => `\`${v.name}\``).join(' · ');
      return `\n### → ${cat.title}\n\n${pills}`;
    }
    const rows = cat.finalCatFns.map((v) => `| \`${v.name}\` | ${v.description || '—'} |`).join('\n');
    return `\n### → ${cat.title}\n\n| Name | Description |\n| --- | --- |\n${rows}`;
  })
  .join('\n')}
`;

const README = `
# node-red-contrib-ultimate-toolkit

<h3 align="center">The Swiss Army knife for Node-RED — dates, math, strings, arrays & more, all in one lightweight node.</h3>

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
${statCardsPart}

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

\`\`\`bash
npm install @keload/node-red-contrib-ultimate-toolkit
\`\`\`

You can also install it directly from the Node-RED editor via **Manage Palette**.

## Performance 🚀

All used libraries are treeshaked and included in the final bundle.

**No extra dependencies are added.**

## Features ✨

${featurePart}

## Contributing & Developer Experience
This package is built using [node-red-dxp](https://www.npmjs.com/package/@keload/node-red-dxp), offering a blazing-fast and seamless way to develop Node-RED packages. 

Written in **TypeScript**, the codebase is cleanly structured, ensuring maintainability and effortless scalability.

We’re committed to keeping this node alive and thriving, making it a joy to evolve and improve over time. Whether it's refining existing features or adding new capabilities, contributing should always be an enjoyable experience.

Feel free to join the journey—create issues, submit pull requests, or share your ideas. Let’s build something incredible together!

## License

MIT
`.trim();

fs.writeFileSync('./README.md', `${README}\n`);
