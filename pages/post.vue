<script setup lang="ts">

import { Field as FormField, useForm } from 'vee-validate'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    video: z.string().min(1),
    title: z.string().min(5),
    description: z.string().min(5),
    category: z.number(),
    tags: z.array(z.string()).default([]),
    publishTime: z.date().min(new Date()).optional(),
    visibility: z.number(),
  })),
})

const handleSubmit = form.handleSubmit(async (values) => {

})

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8 p-8">
    <h1 class="text-5xl">创作服务平台</h1>

    <form class="max-w-250 w-full space-y-8" @submit.prevent>
      <ManageVideoUploader />
      <FormField v-slot="{ componentField }" name="title">
        <UiFormItem>
          <UiFormLabel>标题 {{ componentField }}</UiFormLabel>
          <UiFormControl>
            <UiInput type="text" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <UiFormItem>
          <UiFormLabel>视频描述 {{ componentField }}</UiFormLabel>
          <UiFormControl>
            <UiTextarea v-bind="componentField" />
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

      <UiButton>
        立即投稿
      </UiButton>

    </Form>
  </div>
</template>
