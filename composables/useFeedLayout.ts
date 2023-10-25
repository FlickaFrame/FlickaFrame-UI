export function useCardHeight(rowUnit = 5, rowGap = 3) {
  const rootElement: Ref<HTMLElement | null> = ref(null)

  useResizeObserver(rootElement, ([entry]) => {
    if (!entry || !rootElement.value) return

    const rows = Math.ceil(entry.contentRect.height / rowUnit) + rowGap
    rootElement.value.style.gridRowEnd = `span ${rows}`
  })

  return { rootElement }
}

export function useCardColumnNum() {
  const listElement = ref<HTMLElement | null>(null)
  const { width } = useElementSize(listElement)
  const cardColumnNum = computed(() => {
    let n = Math.floor(width.value / 300)
    if (n < 1) n = 1
    return n
  })

  return { cardColumnNum, listElement }
}
