<script setup lang="ts">

const post = ref({
  id: 1,
  user: {
    image: 'https://github.com/radix-vue.png',
    name: 'XXX',
  },
  likes: [],
  video: 'https://oplayer.vercel.app/君の名は.mp4',
})

const router = useRouter()

const video = ref<HTMLVideoElement | null>(null)

</script>

<template>
  <div>
    <div class="flex border-b py-6">

      <UiAvatar class="cursor-pointer">
        <UiAvatarImage :src="post.user.image" alt="user avatar" />
        <UiAvatarFallback>{{ 'x' }}</UiAvatarFallback>
      </UiAvatar>

      <div class="w-full px-4 pl-3">
        <div class="flex items-center justify-between pb-0.5">
          <button @click="isLoggedIn(post.user)">
            <span class="cursor-pointer font-bold hover:underline">
              {{ post.user.name }}
            </span>
            <span class="cursor-pointer pl-1 text-[13px] text-gray-500 text-light">
              {{ post.user.name }}
            </span>
          </button>

          <UiButton variant="outline">Follow </UiButton>

        </div>
        <div class="max-w-[300px] break-words pb-0.5 text-[15px] md:max-w-[400px]">{{ 'dsadsadsadsa' }}</div>
        <div class="pb-0.5 text-[14px] text-gray-500">#fun #cool #SuperAwesome</div>
        <div class="flex items-center pb-0.5 text-[14px] font-semibold">

          <div class="i-mdi-music" />
          <div class="px-1">original sound - AWESOME</div>
          <div class="i-mdi-heart" />

        </div>

        <div class="mt-2.5 flex">
          <div
            class="relative max-h-[580px] max-w-[260px] min-h-[480px] flex cursor-pointer items-center rounded-xl bg-black"
          >
            <video
              v-if="post.video"
              ref="video"
              loop
              muted
              class="mx-auto h-full rounded-xl object-cover"
              :src="post.video"
            />

          </div>
          <div class="relative mr-[75px]">
            <div class="absolute bottom-0 pl-2">
              <div class="pb-4 text-center">
                <button class="cursor-pointer rounded-full bg-gray-200 p-2">
                  <div class="i-mdi-heart" />
                </button>
                <span class="text-xs font-semibold text-gray-800">{{ post.likes.length }}</span>
              </div>
              <div class="pb-4 text-center">
                <div class="cursor-pointer rounded-full bg-gray-200 p-2">
                  <div class="i-mdi-comment" />
                </div>
                <span class="text-xs font-semibold text-gray-800">43</span>
              </div>
              <div class="text-center">
                <div class="cursor-pointer rounded-full bg-gray-200 p-2">
                  <div class="i-mdi-share" />
                </div>
                <span class="text-xs font-semibold text-gray-800">55</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- post评论 -->
    <div class="flex-1 overflow-y-auto px-6 pt-6">
      <div class="mb-4 text-gray/90">
        共 13 条评论
      </div>
      <FeedInteractionCommentItem />

      <FeedInteractionCommentItem class="ml-14" />
      <FeedInteractionCommentItem class="ml-14" />

    </div>
    <UiSeparator />
    <!-- post 互动区域 -->
    <div>
      <FeedInteractionLine class="my-4 px-8 text-xl" />

      <FeedInteractionInput class="my-6 px-8" />

    </div>
  </div>

</template>
