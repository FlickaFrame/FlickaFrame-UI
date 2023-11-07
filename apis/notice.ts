import type { NoticeListResponse, NoticeType } from '~/models'

export function getNoticeList(noticeType: NoticeType) {
  return $fetch<ApiResult<NoticeListResponse>>('/api/notice/type', {
    query: {
      noticeType,
    },
  })
}
