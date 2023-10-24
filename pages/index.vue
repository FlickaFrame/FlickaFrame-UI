<script setup lang="ts">
import { useCardColRatio } from '~/composables/useFeedLayout'
const route = useRoute()

const { cardColRatio, listElement } = useCardColRatio()

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
  <div ref="listElement" class="feed-list">
    <FeedCard v-for="item in feeds" :key="item" />
  </div>
  <div ref="loadingElement">loading</div>
</template>

<style scoped>

.feed-list {
  --feed-row-unit: 5px;
  --feed-col-unit: 15px;
  display: grid;
  grid-auto-rows: var(--feed-row-unit);
  grid-template-columns: repeat(auto-fill, calc(v-bind(cardColRatio) - var(--feed-col-unit)));
  align-items: start;
  justify-content: space-between;
}

</style>
