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

onKeyStroke('esc', () => {
  show.value = false
})
</script>

<template>
  <Teleport to="body">

    <div
      v-if="show"
      class="bg-black bg-opacity-10 flex fixed h-screen w-screen justify-center items-center left-0 top-0 z-100 transition-all"
      @click="show = !show"
    >

      <div class="bg-white border-2 rounded-full shadow flex fixed h-10 w-10 justify-center items-center left-10 top-10 transition-all hover:border-slate-300 hover:shadow-lg">
        <div class="i-mdi-close-thick text-6 text-slate-600" />
      </div>

      <div class="my-10 rounded-8 shadow-lg flex h-9/10 w-7/10 overflow-hidden" @click.stop>
        <div class="left h-full w-6/10">
          <Video />
        </div>
        <div class="left bg-gray flex-1 h-full" />
      </div>
    </div>

  </Teleport>

</template>
