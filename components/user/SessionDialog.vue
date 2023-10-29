<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field as FormField, useForm } from 'vee-validate'
import * as z from 'zod'
import { useSessionStore } from '~/stores/session'
import { DialogClose, DialogRoot } from 'radix-vue'
import type Toast from '~/components/ui/toast/Toast.vue'

const store = useSessionStore()

enum SessionMode {
  Login, Register,
}

const currentMode = ref<SessionMode>(SessionMode.Register)

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

const toastRef = ref<InstanceType<typeof Toast>>()

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
    const registerRes = await store.register(values as any)
    if (registerRes) {
      toastRef.value?.publish({ desc: '注册成功, 请登录' })
      changeState()
    } else {
      toastRef.value?.publish({
        type: 'warning',
        desc: '注册失败～ 请检查网络连接状态',
      })
    }
  } else {
    const loginRes = await store.login(values)
    if (loginRes) {
      toastRef.value?.publish({ desc: '登录成功' })
    } else {
      toastRef.value?.publish({
        type: 'warning',
        desc: '登录失败～ 请检查网络连接状态',
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

  console.log(form)

  form.validate()
}

const isOpen = ref(false)

onMounted(() => {
  isOpen.value = true
})

</script>

<template>
  <DialogRoot>
    <UiDialogTrigger as-child>
      <slot />
    </UiDialogTrigger>
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle class="text-lg">{{ currentText.title }}</UiDialogTitle>
        <UiDialogDescription>
          {{ currentText.description }} {{ form }}
        </UiDialogDescription>
      </UiDialogHeader>
      <form class="space-y-4" @submit="handleSubmit">
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
    <UiToast ref="toastRef" />

  </DialogRoot>
</template>
