// WIP
import { useState } from 'react';

const data = {}

export default function useStore (key: string) {
  const [store, setStore] = useState(data)
  const setStoreByKey = () => {

  } 

  //@ts-ignore
  return [store[key], setStoreByKey]
}