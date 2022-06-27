export function getStore(key: string) {
  return sessionStorage[key]
}

export function setStore(key: string, value: any) {
  sessionStorage.setItem(key, value)
}