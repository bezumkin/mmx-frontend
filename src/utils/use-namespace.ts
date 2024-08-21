let appNamespace = 'mmx'

export function setNamespace(namespace: string) {
  appNamespace = namespace
}

export function getNamespace(): string {
  return appNamespace
}
