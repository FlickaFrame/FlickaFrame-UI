<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field as FormField, useForm } from 'vee-validate'
import * as z from 'zod'
import { DialogClose, DialogRoot } from 'radix-vue'
import { getUserInfo, login, register } from '~/apis'

enum SessionMode {
  Login, Register,
}

const currentMode = ref<SessionMode>(SessionMode.Login)

const isOpen = ref(false)

const sessionText = {
  [SessionMode.Login]: {
    title: '登录',
    description: '已经有账号了？赶快登录吧',
    submit: '登录',
    changeState: '没有账号？点我注册',
  },
  [SessionMode.Register]: {
    title: '注册',
    description: '注册 FlickaFramer 账号，开始你的创作之旅吧',
    submit: '注册',
    changeState: '已经有账号了？点击登录',
  },
}

const currentText = computed(() => sessionText[currentMode.value])

const formSchema = computed(() => {
  const schemaMap = {
    [SessionMode.Login]: z.object({
      phone: z.string().min(4),
      nickName: z.undefined(),
      password: z.string().min(4),
    }),
    [SessionMode.Register]: z.object({
      phone: z.string().min(4),
      nickName: z.string().min(4),
      password: z.string().min(4),
    }),
  }

  return toTypedSchema(schemaMap[currentMode.value])
})

const form = useForm({
  validationSchema: formSchema,
})

const handleSubmit = form.handleSubmit(async (values) => {
  if (currentMode.value === SessionMode.Register) {
    const res = await register(values)

    if (res.success) {
      toast.publish({ desc: '注册成功' })
    } else {
      toast.publish({
        title: '注册失败～',
        desc: res.msg,
      })
    }
    changeState()
  } else {
    const { success: loginSucess, msg } = await login(values)
    if (loginSucess) {
      const { success: infoSucess, data } = await getUserInfo()
      if (infoSucess) {
        toast.publish({ title: '登录成功', desc: `欢迎回来${data.nickName}` })
        isOpen.value = false
      }
    } else {
      toast.publish({
        type: 'warning',
        desc: `登录失败～ ${msg}`,
      })
    }
  }
})

function changeState() {
  if (currentMode.value === SessionMode.Login) {
    currentMode.value = SessionMode.Register
    return
  }

  if (currentMode.value === SessionMode.Register) {
    currentMode.value = SessionMode.Login
  }
}

</script>

<template>
  <DialogRoot v-model:open="isOpen">
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
      <form class="space-y-4" @submit.prevent>
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
            <UiFormMessage />
          </UiFormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">

          <UiFormItem>
            <UiFormLabel>密码</UiFormLabel>
            <UiFormControl>
              <UiInput type="password" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </FormField>
        <div class="flex flex-row-reverse gap-4">

          <UiButton type="submit" class="w-20" @click="handleSubmit">
            {{ currentText.submit }}
          </UiButton>

          <DialogClose>
            <UiButton variant="outline" class="w-20">
              取消
            </UiButton>
          </DialogClose>

          <div class="flex-1">
            <UiButton
              variant="link"
              class="px-0"
              @click="changeState"
            >
              {{ currentText.changeState }}
            </UiButton>
          </div>
        </div>
      </Form>
    </UiDialogContent>

  </DialogRoot>
</template>
