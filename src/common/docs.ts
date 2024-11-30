export function docsFromRadash(entity: string) {
  return `
📖 <a href="https://radash-docs.vercel.app/docs/${entity}" target="_blank">View documentation on <span class="font-bold">Radash</span> <i class="fa fa-external-link"></a></i>
  `;
}

export function docsFromEsToolkit(entity: string) {
  return `
📖 <a href="https://es-toolkit.slash.page/reference/${entity}.html" target="_blank">View documentation on <span class="font-bold">ES Toolkit</span> <i class="fa fa-external-link"></a></i>
  `;
}
