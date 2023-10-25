<script setup>
const show = defineModel('show', { default: false })
// console.log('show', show)

watch(() => show.value, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

const { escape } = useMagicKeys()

watch(escape, (v) => {
  if (v) { show.value = false }
})
</script>

<template>
  <Teleport to="body">

    <div
      v-if="show"
      class="flex fixed h-screen w-screen justify-center items-center left-0 top-0 z-100 backdrop-grayscale"
      @click="show = !show"
    >
      <Video class="bg-blue flex flex-row h-192 w-108 justify-center" />
      <div class="bg-white flex flex-row h-screen w-100 justify-center">评论区</div>
    </div>

  </Teleport>

</template>
