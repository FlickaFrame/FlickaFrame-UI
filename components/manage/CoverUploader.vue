<script setup lang="ts">
import { createFileToken, getFileUrl, uploadFile } from '~/apis'
import { UpTokenType } from '~/models'
import type { UploadFile, UploadProps } from 'ant-design-vue'
import { Upload } from 'ant-design-vue'

const fileUrl = defineModel<string | undefined>({ default: undefined })

function getInitFileList(): UploadProps['fileList'] {
  if (fileUrl.value) {
    return [{
      uid: fileUrl.value,
      name: fileUrl.value,
      url: fileUrl.value,
      thumbUrl: fileUrl.value,
    }]
  }
  return []
}

const fileList = ref<UploadProps['fileList']>(getInitFileList())

watch(fileList, (newVal) => {
  const [firstImg] = newVal ?? []

  if (firstImg) {
    fileUrl.value = (firstImg.response as any)?.thumbUrl || firstImg.thumbUrl
  } else {
    fileUrl.value = undefined
  }
}, { deep: true })

const previewVisible = ref(false)
const previewTitle = ref('')
const previewImage = ref('')

function handleCancel() {
  previewVisible.value = false
  previewTitle.value = ''
}

async function handlePreview(file: UploadFile) {
  const ossURL = file.response?.thumbUrl

  previewImage.value = ossURL || file.thumbUrl
  previewVisible.value = true
  previewTitle.value = file.name || file?.url?.substring(file.url.lastIndexOf('/') + 1) || ''
}

interface UploadRequestOption {
  file: File
  onError: (err: any) => void
  onProgress: (e: { percent: number }) => void
  onSuccess: (ret: any, xhr?: any) => void
}

async function customRequest(option: UploadRequestOption) {
  const { success: tokenSuccess, data: tokenData } = await createFileToken({ uploadType: UpTokenType.Cover })

  if (!tokenSuccess) {
    message.error('获取上传凭证失败')
    option.onError({ })
    return
  }

  try {
    const { key } = await uploadFile(option.file, tokenData.upToken, UpTokenType.Cover)

    const thumbUrl = await getFileUrl(key)
    option.onSuccess({ thumbUrl })
  } catch (e) {
    message.error('上传文件失败')
    option.onError({ })
  }
}

function beforeUpload(file: UploadFile) {
  const isImage = file.type?.startsWith('image/')
  if (!isImage) {
    message.error('只能上传图片哦')
    fileList.value = []
  }

  return isImage || Upload.LIST_IGNORE
}
</script>

<template>
  <div>
    <AUpload
      v-model:file-list="fileList"
      :custom-request="customRequest"
      list-type="picture-card"
      :max-count="1"
      :before-upload="beforeUpload"
      @preview="handlePreview"
    >
      <div v-if="fileList && fileList.length < 8">
        <div class="inline-flex items-center">
          <div class="i-mdi-upload text-lg" />
          {{ fileList.length ? '修改封面' : '上传封面' }}
        </div>
      </div>
    </AUpload>

    <AModal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" class="w-full" :src="previewImage">
    </AModal>

  </div>

</template>
