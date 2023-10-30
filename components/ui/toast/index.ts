export type ToastType = 'notify' | 'warning'

export interface ToastContent {
  type?: ToastType
  title?: string
  desc: string
}

export interface ToastAction {
  publish: (content?: ToastContent) => void
}
