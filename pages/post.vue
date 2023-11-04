<script setup lang="ts">

import { Field as FormField, useForm } from 'vee-validate'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { getUrlOssKey, postVideo } from '~/apis'

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    playUrl: z.string().min(1),
    thumbUrl: z.string().min(1),
    title: z.string().min(5),
    description: z.string().min(5),
    category: z.number().default(1),
    tags: z.array(z.string()).default([]),
    publishTime: z.number().optional(),
    visibility: z.number().default(1),
  })),
})

const handleSubmit = form.handleSubmit(async (values) => {
  values.thumbUrl = getUrlOssKey(values.thumbUrl)
  const { success } = await postVideo(values)
  if (!success) {
    message.error('投稿失败')
  } else {
    message.success('投稿成功')
  }
})

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8 p-8">
    <h1 class="text-5xl">创作服务平台{{ form.errors }}</h1>

    <form class="max-w-250 w-full space-y-8" @submit.prevent>

      <FormField v-slot="{ componentField }" name="playUrl">
        <UiFormItem>
          <UiFormLabel>视频 {{ componentField }}</UiFormLabel>
          <UiFormControl>
            <ManageVideoUploader v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="thumbUrl">
        <UiFormItem>
          <UiFormLabel>封面 {{ componentField }}</UiFormLabel>
          <UiFormControl>
            <ManageCoverUploader v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="title">
        <UiFormItem>
          <UiFormLabel>标题 {{ componentField }}</UiFormLabel>
          <UiFormControl>
            <UiInput v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="category">
        <UiFormItem>
          <UiFormLabel>分类 {{ componentField }}</UiFormLabel>
          <UiFormControl>
            <ManageCategorySelector v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>

      </FormField>

      <FormField v-slot="{ componentField }" name="tags">
        <UiFormItem>
          <UiFormLabel>标签{{ componentField }}</UiFormLabel>
          <UiFormControl>
            <ManageTagManager v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <UiFormItem>
          <UiFormLabel>视频描述</UiFormLabel>
          <UiFormControl>
            <UiTextarea placeholder="详细描述一下视频吧～" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="publishTime">
        <UiFormItem>
          <UiFormLabel>上传时间 {{ componentField }}</UiFormLabel>
          <UiFormControl>
            <ManageUploadTimeSelector v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="visibility">
        <UiFormItem>
          <UiFormLabel>可见性 {{ componentField }}</UiFormLabel>
          <UiFormControl>
            <ManageVisibilitySelector v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </FormField>
      <div class="w-full flex flex-row-reverse">
        <UiButton @click="handleSubmit">
          立即投稿
        </UiButton>
      </div>

    </Form>
  </div>
</template>
