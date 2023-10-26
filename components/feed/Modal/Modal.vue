<script setup lang="ts">
import { ref } from 'vue'

const show = defineModel('show', { default: false })
// console.log('show', show)

watch(() => show.value, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

onKeyStroke('esc', () => {
  show.value = false
})

const cardWrapperElement = ref<HTMLDivElement | null>(null)

function useCardScroll() {
  const scrollWindow = 2
  const cardList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
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
        nextTick(() => {
          startIndex.value += offset
          setTimeout(() => {
            pending.value = false
            stopping.value = false
            resolve(undefined)
          }, 0)
        })
      }, 800)
    })
  }

  const cardOrder = computed(() => {
    return activeCardList.value.indexOf(cardList.value[cardIndex.value])
  })

  onKeyStroke('ArrowDown', async () => {
    await navgate(1)

    cardList.value.push(cardList.value[cardList.value.length - 1] + 1)
  })

  onKeyStroke('ArrowUp', async () => {
    await navgate(-1)
  })

  return { activeCardList, cardOrder, pending }
}

const { activeCardList, cardOrder, pending } = useCardScroll()

</script>

<template>
  <Teleport to="body">

    <div
      v-if="show"
      v-motion-fade
      class="bg-black bg-opacity-10 flex fixed h-screen w-screen justify-center items-start left-0 top-0 z-100 transition-all"
      @click="show = !show"
    >
      <div class="bg-white border-2 rounded-full shadow flex fixed h-10 w-10 justify-center items-center left-10 top-10 transition-all hover:border-slate-300 hover:shadow-lg">
        <div class="i-mdi-close-thick text-6 text-slate-600" />
      </div>

      <div
        ref="cardWrapperElement"
        class="w-7/10 overflow-y-hidden"

        :class="{ 'transition-all': !pending }"
        :style="{ transform: `translateY(-${85 * cardOrder}vh)` }"
      >
        <template v-for="item in activeCardList" :key="item">
          <div
            m="y-5vh first:t-10vh last:b-10vh"
            class="rounded-8 shadow-lg flex h-[80vh] overflow-hidden" @click.stop
          >
            <div class="h-full w-6/10">
              <Video />
            </div>

            <FeedModalInteraction class="bg-gray flex-1 h-full" />

          </div>
        </template>
      </div>

    </div>

  </Teleport>

</template>

<style scoped>

</style>
