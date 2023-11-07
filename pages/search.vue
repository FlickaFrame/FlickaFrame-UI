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
  <div>
    {{ pending }}
    {{ data }}
  </div>

</template>
