<script setup lang="ts">

import { useCardColumnNum } from '~/composables/useFeedLayout'

const isOpen = ref(false)

const categoryId = ref(0)

const { cardColumnNum, listElement } = useCardColumnNum()

const { feedList, isEnd, refresh } = useFeedData(categoryId)
const loadingElement = ref<HTMLElement | null>(null)

const activeIndex = ref(-1)
const openedIndex = ref(-1)

// useIntersectionObserver(loadingElement, (vals) => {
//   for (const change of vals) {
//     if (change.isIntersecting) {
//       feeds.value.push(...Array.from({ length: 20 }, (_, i) => i))
//     }
//   }
// })

// const active

function handleOpenModal(idx: number) {
  isOpen.value = true
  openedIndex.value = idx
}

</script>

<template>
  <div>
    <FeedCategoryTab v-model="categoryId" class="sticky top-0 backdrop-blur" />
    <div ref="listElement" class="feed-list px-6">
      <FeedCard
        v-for="item, idx in feedList"
        :key="item.id"
        :info="item"
        :active="idx === activeIndex"
        @hover="activeIndex = idx"
        @click="handleOpenModal(idx)"
      />
    </div>
    <FeedModal
      v-model="isOpen"
      v-model:current="openedIndex"
      :items="feedList || []"
    />
    <div ref="loadingElement">loading</div>
  </div>

</template>

<style scoped>

.feed-list {
  --feed-row-unit: 5px;
  --feed-col-unit: 2rem;
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
