<script setup lang="ts">
import SparkMD5 from 'spark-md5'
import { createVideoToken, uploadVideoFile } from '~/apis'

const selectFileElement = ref<HTMLInputElement | null>(null)

function generateMD5(file: File): Promise<string> {
  const spark = new SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()
  return new Promise((resolve) => {
    fileReader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer)
      const md5 = spark.end()
      resolve(md5)
    }
    fileReader.readAsArrayBuffer(file)
  })
}

const isUploading = ref(false)

async function onVideoSelect() {
  if (isUploading.value) return

  const [file] = selectFileElement.value?.files || []
  if (!file) {
    toast.publish({ type: 'warning', desc: '请选择视频' })
  } else {
    isUploading.value = true
    const result = await upload(file)
    isUploading.value = false
    if (!result) {
      toast.publish({ type: 'warning', desc: '上传失败' })
    } else {
      toast.publish({ desc: '上传成功' })
      navigateTo({
        path: '/video-edit',
        query: { hash: result.hash, key: result.key },
      })
    }
  }
}

async function upload(file: File) {
  const { success: tokenSuccess, data: tokenData } = await createVideoToken()

  if (!tokenSuccess) return false

  const key = await generateMD5(file)

  const { success: videoSuccess, data: videoData } = await uploadVideoFile(file, tokenData!.upToken, key)

  if (!videoSuccess) return false

  return videoData
}

</script>

<template>
  <div class="flex flex-col justify-center p-8">
    <h1 class="text-5xl">创作服务平台</h1>
    <UiCard class="mt-5 p-10">
      <div
        class="relative h-80 w-full border-2 rounded-md border-dotted bg-foreground/5 hover-border-indigo-600"
      >
        <input ref="selectFileElement" class="h-full w-full cursor-pointer opacity-0" type="file" accept="video/*" @change="onVideoSelect">
        <div
          class="pointer-events-none absolute left-1/2 top-1/2 flex-col-center -translate-x-1/2 -translate-y-1/2"
        >
          <div>拖拽视频到此或点击上传</div>
          <UiButton
            class="mt-2 w-30 rounded-sm"
            :disabled="isUploading"
          >
            <span class="flex-center gap-1">
              <div v-if="isUploading" class="i-mdi-loading animate-spin text-lg" />
              {{ isUploading ? '正在上传' : '上传视频' }}
            </span>

          </UiButton>
        </div>
      </div>
    </UiCard>
  </div>
</template>
