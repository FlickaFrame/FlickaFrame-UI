<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field as FormField, useForm } from 'vee-validate'
import * as z from 'zod'
import { useSessionStore } from '~/stores/session'

const store = useSessionStore()

const formSchema = toTypedSchema(z.object({
  phone: z.string(),
  password: z.string(),
  nickName: z.string(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
  store.register(values)
})
</script>

<template>
  <UiDialog>
    <UiDialogTrigger as-child>
      <UiButton variant="outline">
        登录
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-[425px]">
      <UiDialogHeader>
        <UiDialogTitle>登录</UiDialogTitle>
        <UiDialogDescription>
          登录描述 登录描述登录描述登录描述登录描述登录描述登录描述登录描述登录描述登录描述登录描述登录描述登录描述
        </UiDialogDescription>
      </UiDialogHeader>
      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="phone">
          <UiFormItem>
            <UiFormLabel>手机号码</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" v-bind="componentField" />
            </UiFormControl>
            <!-- <UiFormDescription>
              This is your public display name.
            </UiFormDescription> -->
            <UiFormMessage />
          </UiFormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="nickName">
          <UiFormItem>
            <UiFormLabel>昵称</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" v-bind="componentField" />
            </UiFormControl>
            <!-- <UiFormDescription>
              This is your public display name.
            </UiFormDescription> -->
            <UiFormMessage />
          </UiFormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <UiFormItem>
            <UiFormLabel>密码 </UiFormLabel>
            <UiFormControl>
              <UiInput type="password" v-bind="componentField" />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </FormField>
        <UiButton type="submit">
          Submit
        </UiButton>
      </Form>

    </UiDialogContent>
  </UiDialog>
</template>
