<script setup lang="ts">
const { feedList, isEnd, addMore, pending } = useFeedData(ref('0'))

</script>

<template>
  <div class="my-4 flex flex-wrap items-center justify-evenly gap-2">
    <ManageVideoCard v-for="item in feedList" :key="item.id" :info="item" />
  </div>

</template>
