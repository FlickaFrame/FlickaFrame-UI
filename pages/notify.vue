<script setup lang="ts">

import { NoticeType } from '~/models'

const selectedTab = ref<NoticeType>(NoticeType.Follow)

</script>

<template>
  <UserNoticeTab v-model:tab="selectedTab" class="p-10" />
</template>
