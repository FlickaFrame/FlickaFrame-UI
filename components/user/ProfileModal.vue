<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field as FormField, useForm } from 'vee-validate'
import * as z from 'zod'
import { UserGender } from '~/models'
import { editUserInfo } from '~/apis'

const open = defineModel({ default: true })

const store = useSessionStore()

const initialValues = {
  slogan: store.info.slogan,
  nickName: store.info.nickName,
  age: store.info.age,
  gender: store.info.gender,
  avatarUrl: store.info.avatarUrl || '',
  backgroundUrl: store.info.backgroundUrl || '',
}

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    nickName: z.string().min(1),
    slogan: z.string(),
    age: z.number().default(18),
    gender: z.nativeEnum(UserGender).default(UserGender.Unknown),
    avatarUrl: z.string(),
    backgroundUrl: z.string(),
  })),
  initialValues,
})

const handleSubmit = form.handleSubmit(async (values) => {
  const { success } = await editUserInfo(values)

  if (success) {
    message.success('修改成功')
    open.value = false
  } else {
    message.error('修改失败')
  }
})

</script>

<template>
  <UiDialog v-model:open="open">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle class="text-lg"> 修改个人资料 {{ initialValues }}</UiDialogTitle>
        <UiDialogDescription>
          修改个人资料修改个人资料修改个人资料
        </UiDialogDescription>
      </UiDialogHeader>
      <form class="space-y-4" @submit.prevent>
        <FormField v-slot="{ componentField }" name="nickName">

          <UiFormItem>
            <UiFormLabel>昵称 {{ componentField }}</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="slogan">
          <UiFormItem>
            <UiFormLabel>个性签名</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" v-bind="componentField" placeholder="输入个性签名，彰显你的态度" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="age">
          <UiFormItem>
            <UiFormLabel>年龄</UiFormLabel>
            <UiFormControl>
              <UserAgeInput v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="gender">

          <UiFormItem>
            <UiFormLabel>性别</UiFormLabel>
            <UiFormControl>
              <UserGenderSelect v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </FormField>
        <div class="flex flex-row-reverse gap-4">
          <UiButton variant="outline" class="w-20" @click="open = false">
            取消
          </UiButton>
          <UiButton class="w-20" @click="handleSubmit">
            确认
          </UiButton>
        </div>
      </Form>
    </UiDialogContent>

  </UiDialog>
</template>
