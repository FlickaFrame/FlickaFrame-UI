<script setup lang="ts">
import SparkMD5 from 'spark-md5'

const selectFileElement = ref<HTMLInputElement | null>(null)

interface UpTokenInfo {
  upToken: string
  expires: number
}

interface VideoInfo {
  hash: string
  key: string
}

async function createUpToken() {
  const { success, data } = await $fetch<ApiResult<UpTokenInfo>>('/api/video/uptoken', {
    method: 'GET',
  })
  if (!success) return
  return data.upToken
}

async function uploadVideoFile(file: File, token: string, key: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('token', token)
  formData.append('key', `video/${key}`)
  const { success, data } = await $fetch<ApiResult<VideoInfo>>('http://up-z2.qiniup.com', {
    method: 'POST',
    body: formData,
  })
  if (!success) return
  return data
}

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

async function onVideoSelect() {
  const file = selectFileElement.value?.files?.[0]
  if (!file) return
  const token = await createUpToken()
  if (!token) return

  const key = await generateMD5(file)

  const data = await uploadVideoFile(file, token, key)
  navigateTo({
    path: '/video-edit',
    query: {
      hash: data?.hash,
      key: data?.key,
    },
  })
}

</script>

<template>
  <div class="flex flex-col justify-center">
    <h1 class="text-5xl">创作服务平台</h1>
    <UiCard class="p-10 mt-5">
      <div
        id="selectFileBox"
        class="bg-[#f7f7f7] border-2 rounded-md border-dotted h-80 w-full hover-border-indigo-600"
      >
        <input ref="selectFileElement" class="flex-center flex-col h-full" type="file" @change="onVideoSelect">
        <div class="flex-center flex-col h-full z-0">
          <div>拖拽视频到此或点击上传</div>
          <UiButton class="mt-2 rounded-sm w-30">上传视频</UiButton>
        </div>
      </div>
    </UiCard>
  </div>
</template>

<style scoped>
#selectFileBox input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
