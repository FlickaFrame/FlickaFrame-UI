<script setup lang="ts">
import { ref } from 'vue'

const show = defineModel('show', { default: false })

onKeyStroke('esc', () => {
  show.value = false
})

function useCardScroll() {
  const scrollWindow = 2
  const cardList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const cardIndex = ref(0)

  const slideWindow = reactive({
    start: cardIndex.value - scrollWindow,
    end: cardIndex.value + scrollWindow + 1,
  })

  const activeCardList = computed(() => {
    const length = cardList.value.length - 1

    return cardList.value.slice(
      slideWindow.start < 0 ? 0 : slideWindow.start,
      slideWindow.end > length ? length : slideWindow.end,
    )
  })

  const cardNeighbours = computed(() => {
    const idx = cardIndex.value
    return {
      prev: cardList.value[idx - 1],
      current: cardList.value[idx],
      next: cardList.value[cardIndex.value + 1],
    }
  })

  const activeCardOrder = computed(() => {
    return activeCardList.value.indexOf(cardNeighbours.value.current)
  })

  const pending = ref(false)
  const stopping = ref(false)

  const navgate = async (offset = 1) => {
    if (stopping.value) return
    if (offset > 0 && cardIndex.value >= cardList.value.length - 1) return
    if (offset < 0 && cardIndex.value <= 0) return
    return new Promise<void>((resolve) => {
      stopping.value = true
      cardIndex.value += offset
      slideWindow.end += offset

      setTimeout(() => {
        pending.value = true
        nextTick(() => {
          slideWindow.start += offset
          setTimeout(() => {
            pending.value = false
            stopping.value = false
            resolve(undefined)
          }, 0)
        })
      }, 1000)
    })
  }

  onKeyStroke('ArrowDown', async () => {
    await navgate(1)
  })

  onKeyStroke('ArrowUp', async () => {
    await navgate(-1)
  })

  return { activeCardList, activeCardOrder, pending, cardNeighbours, navgate }
}

const { activeCardList, activeCardOrder, pending, cardNeighbours, navgate } = useCardScroll()

function handleClickCard(cardItem: number) {
  if (cardItem === cardNeighbours.value.current) return

  if (cardItem === cardNeighbours.value.prev) navgate(-1)

  if (cardItem === cardNeighbours.value.next) navgate(1)
}

</script>

<template>
  <Teleport to="body">

    <div
      v-if="show"
      class="fixed left-0 top-0 z-100 h-screen w-screen flex items-start justify-center bg-black bg-opacity-10"
      @click="show = !show"
    >
      <div class="fixed left-10 top-10 h-10 w-10 flex items-center justify-center border-2 rounded-full bg-white shadow transition-all hover:border-slate-300 hover:shadow-lg">
        <div class="i-mdi-close-thick text-6 text-slate-600" />
      </div>

      <div
        class="w-7/10 overflow-y-hidden"
        :class="{ 'transition-transform': !pending }"
        :style="{ transform: `translateY(-${85 * activeCardOrder}vh)` }"
      >
        <template v-for="cardItem in activeCardList" :key="cardItem">
          <FeedContent
            m="y-5vh first:t-10vh last:b-10vh"
            class="h-[80vh]"
            :active="cardNeighbours.current === cardItem"
            @click.stop="handleClickCard(cardItem)"
          />
        </template>
      </div>
    </div>
  </Teleport>

</template>

<style scoped>

</style>
