<script setup lang="ts">

import { searchVideo } from '~/apis'

const route = useRoute()

const keyword = computed(() => route.query.q as string)
const { data, pending, refresh } = useAsyncData('123', async () => {
  if (!keyword.value) return null

  const { data } = await searchVideo({
    keyword: keyword.value,
    limit: 0,
    offset: 0,
  })
  return data
}, { watch: [keyword] })

</script>

<template>
  <div v-if="data">
    <h1 class="p-10 text-xl">
      {{ `⚡️⚡️ 在 ${data.processingTimeMs} ms 内找到了关于 ${data.query} 的 ${data.estimatedTotalHits} 个结果：` }}
    </h1>
    <div>
      <FeedActivity
        v-for="item in data.list"
        :key="item.id"
        :info="item"
        raw
      />
    </div>

  </div>
  <div v-else>
    Loading: {{ data }}
  </div>

</template>
