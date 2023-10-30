export type ToastType = 'notify' | 'warning'

export interface ToastContent {
  type?: ToastType
  title?: string
  desc: string
  duration?: number
}

export interface ToastAction {
  publish: (content: ToastContent | string) => void
}
