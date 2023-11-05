export function useChangeSet<K extends number | string, V>() {
  const changeSet = ref({}) as Ref<Record<K, V>>

  const get = (id: K, fallback: V) => {
    if (id in changeSet.value) {
      return changeSet.value[id]
    } else {
      return fallback
    }
  }

  const set = (id: K, value: V) => {
    changeSet.value[id] = value
  }

  return { get, set, changeSet }
}
