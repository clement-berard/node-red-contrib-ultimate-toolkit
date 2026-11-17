export function docsFromRadash(entity: string) {
  return `
📖 <a href="https://radash-docs.vercel.app/docs/${entity}" target="_blank">View documentation on <span class="font-bold">Radash</span> <i class="fa fa-external-link"></i></a>
  `;
}

export function docsFromEsToolkit(entity: string) {
  return `
📖 <a href="https://es-toolkit.slash.page/reference/${entity}.html" target="_blank">View documentation on <span class="font-bold">ES Toolkit</span> <i class="fa fa-external-link"></i></a>
  `;
}

export function docsFromMdn(entity: string) {
  return `
📖 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${entity}" target="_blank">View documentation on <span class="font-bold">MDN</span> <i class="fa fa-external-link"></i></a>
  `;
}

// Short aliases used by the category metadata files
export const es = docsFromEsToolkit;
export const radash = docsFromRadash;
export const mdn = docsFromMdn;
