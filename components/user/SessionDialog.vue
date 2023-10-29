<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field as FormField, useForm } from 'vee-validate'
import * as z from 'zod'
import { useSessionStore } from '~/stores/session'
import { DialogClose, DialogRoot } from 'radix-vue'

const store = useSessionStore()

enum SessionMode {
  Login, Register,
}

const currentMode = ref<SessionMode>(SessionMode.Login)

const sessionText = {
  [SessionMode.Login]: {
    title: '登录',
    description: '已经有账号了？赶快登录吧',
    submit: '登录',
  },
  [SessionMode.Register]: {
    title: '登录',
    description: '已经有账号了？赶快登录吧',
    submit: '登录',
  },
}

const currentText = computed(() => sessionText[currentMode.value])

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
  <DialogRoot class="p-20">
    <UiDialogTrigger as-child>
      <slot />
    </UiDialogTrigger>
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle class="text-lg">{{ currentText.title }}</UiDialogTitle>
        <UiDialogDescription>
          {{ currentText.description }}
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
        <FormField v-if="currentMode === SessionMode.Register" v-slot="{ componentField }" name="nickName">
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
        <div class="flex flex-row-reverse gap-4">
          <UiButton type="submit" class="w-20">
            {{ currentText.submit }}
          </UiButton>

          <DialogClose>
            <UiButton variant="outline" class="w-20">
              取消
            </UiButton>
          </DialogClose>

          <div class="flex-1">

            <UiButton
              v-if="currentMode === SessionMode.Login"
              variant="link"
              class="px-0"
              @click="currentMode = SessionMode.Register"
            >
              没有账号？点我注册
            </UiButton>
            <UiButton
              v-if="currentMode === SessionMode.Register"
              variant="link"
              class="px-0"
              @click="currentMode = SessionMode.Login"
            >
              已经有账号了？点击登录
            </UiButton>
          </div>

        </div>

      </Form>

    </UiDialogContent>
  </DialogRoot>
</template>
