<script setup lang="ts">

import { createFileToken, editUserInfo, uploadFile } from '~/apis'
import { UpTokenType } from '~/models'

const props = withDefaults(defineProps<{
  field: 'avatarUrl' | 'backgroundUrl'
}>(), {
  field: 'avatarUrl',
})

const emit = defineEmits<{
  (e: 'change'): void
}>()

const selectFileElement = ref<HTMLInputElement | null>(null)

async function upload(file: File) {
  const { success: tokenSuccess, data: tokenData } = await createFileToken({ uploadType: UpTokenType.Avatar })
  if (!tokenSuccess) {
    return { success: false }
  }
  const uploadResult = await uploadFile(file, tokenData!.upToken, UpTokenType.Avatar)

  return editUserInfo({ [props.field]: uploadResult.key })
}

async function onPicSelect() {
  const [file] = selectFileElement.value?.files || []
  if (!file) {
    message.warning('请选择图片')
  } else {
    const { success } = await upload(file)

    if (!success) {
      message.error('上传失败')
    } else {
      message.success('上传成功')
    }
  }
}

</script>

<template>

  <input
    ref="selectFileElement"
    type="file"
    accept="image/*"
    @change="onPicSelect"
  >

</template>
