export function useCardHeight(rowUnit = 5, rowGap = 3) {
  const rootElement: Ref<HTMLElement | null> = ref(null)

  useResizeObserver(rootElement, ([entry]) => {
    if (!entry || !rootElement.value) return

    const rows = Math.ceil(entry.contentRect.height / rowUnit) + rowGap
    rootElement.value.style.gridRowEnd = `span ${rows}`
  })

  return { rootElement }
}

export function useCardColRatio() {
  const listElement = ref<HTMLElement | null>(null)
  const { width } = useElementSize(listElement)
  const cardColRatio = computed(() => {
    let remainNum = Math.floor(width.value / 300)
    if (remainNum < 1) remainNum = 1
    return `${(1 / remainNum) * 100}%`
  })

  return { cardColRatio, listElement }
}
