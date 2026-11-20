// Shortcut for the shared `mainValue` field: only its label changes per function
export const value = (label: string) => ({ label });

// Sources of a structured value (array, object) read from the message, a context or a JSON text
export const structuredTypes = ['json', 'msg', 'flow', 'global', 'jsonata', 'env'];
