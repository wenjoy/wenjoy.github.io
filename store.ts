const data: Record<string, string> = {}

export function getStore(key: string) {
  return data[key]
}

export function setStore(key: string, value: any) {
  data[key] = value
}