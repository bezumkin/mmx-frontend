export function setNamespace(namespace: string) {
  localStorage.setItem('mmx-namespace', namespace)
}

export function getNamespace(): string {
  return localStorage.getItem('mmx-namespace') || 'mmx'
}
