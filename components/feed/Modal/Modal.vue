<script setup lang="ts">
import { ref } from 'vue'

const show = defineModel('show', { default: false })

onKeyStroke('esc', () => {
  show.value = false
})

function useCardScroll() {
  const scrollWindow = 2
  const cardList = ref([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ])
  const cardIndex = ref(0)

  const startIndex = ref(cardIndex.value - scrollWindow)
  const endIndex = ref(cardIndex.value + scrollWindow + 1)

  const activeCardList = computed(() => {
    const length = cardList.value.length - 1

    return cardList.value.slice(
      startIndex.value < 0 ? 0 : startIndex.value,
      endIndex.value > length ? length : endIndex.value,
    )
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
      endIndex.value += offset

      setTimeout(() => {
        pending.value = true
        setTimeout(() => {
          startIndex.value += offset
          setTimeout(() => {
            pending.value = false
            stopping.value = false
            resolve(undefined)
          }, 100)
        }, 200)
      }, 500)
    })
  }

  const cardOrder = computed(() => {
    return activeCardList.value.indexOf(cardList.value[cardIndex.value])
  })

  const activeId = computed(() => {
    return activeCardList.value[cardOrder.value].id
  })

  onKeyStroke('ArrowDown', async () => {
    await navgate(1)
  })

  onKeyStroke('ArrowUp', async () => {
    await navgate(-1)
  })

  return { activeCardList, cardOrder, pending, activeId, navgate }
}

const { activeCardList, cardOrder, pending, activeId, navgate } = useCardScroll()

function handleClick(id: number) {
  // navgate()
}

</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      v-motion-fade
      class="fixed left-0 top-0 z-100 h-screen w-screen flex items-start justify-center bg-background/60"
      @click="show = !show"
    >
      <div class="fixed left-10 top-10 h-10 w-10 flex items-center justify-center border-2 rounded-full bg-white shadow transition-all hover:border-slate-300 hover:shadow-lg">
        <div class="i-mdi-close-thick text-6 text-slate-600" />
      </div>

      <div
        class="w-7/10 overflow-y-hidden"
        :class="{ 'transition-all': !pending }"
        :style="{ transform: `translateY(-${85 * cardOrder}vh)` }"
        @click.stop
      >
        <template v-for="item in activeCardList" :key="item">
          <FeedContent
            :active="activeId === item.id"
            m="y-5vh first:t-10vh last:b-10vh"
            class="h-[80vh]"
            @click="handleClick(item.id)"
          />
        </template>
      </div>
    </div>
  </Teleport>

</template>

<style scoped>

</style>
