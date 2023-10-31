<script setup lang="ts">
import { useCardColumnNum } from '~/composables/useFeedLayout'
// const route = useRoute()

// const router = useRouter()

const isOpen = ref(false)

const { cardColumnNum, listElement } = useCardColumnNum()

const feeds = ref(Array.from({ length: 100 }, (_, i) => i))

const loadingElement = ref<HTMLElement | null>(null)
useIntersectionObserver(loadingElement, (vals) => {
  for (const change of vals) {
    if (change.isIntersecting) {
      feeds.value.push(...Array.from({ length: 100 }, (_, i) => i))
    }
  }
})

</script>

<template>
  <div>
    <div
      ref="listElement" v-motion="{
        initial: {
          y: 180,
          opacity: 0,
        },
        enter: {
          y: 0,
          opacity: 1,
        },
      }"
      class="feed-list"
    >
      <FeedCard v-for="item in feeds" :key="item" class="transition-all" @click="isOpen = !isOpen" />
    </div>
    <div ref="loadingElement">loading</div>
    <FeedModal v-model:show="isOpen" />
  </div>

</template>

<style scoped>

.feed-list {
  --feed-row-unit: 5px;
  --feed-col-unit: 15px;
  display: grid;
  grid-auto-rows: var(--feed-row-unit);
  grid-template-columns: repeat(v-bind(cardColumnNum), 1fr);
  column-gap: var(--feed-col-unit);
  align-items: start;
  justify-content: space-between;
}

.feed-list.transitioning {
  transition: all ease-in-out 1s;
}
</style>
