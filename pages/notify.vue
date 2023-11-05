<script setup lang="ts">

import { NoticeTabKey } from '~/models'

const selectedTab = ref<NoticeTabKey>(NoticeTabKey.Comment)

</script>

<template>
  <UserNoticeTab v-model:tab="selectedTab" class="p-10" />
</template>
