export interface DefaultOptions {
  uuid?: string
  requestUrl?: string
  historyTracker?: boolean
  hashTracker?: boolean
  domTracker?: boolean
  sdkVersion?: string | number
  extra?: Record<string, any>
  jsError?: boolean
}

// requestUrl 为必填项
export interface Options extends DefaultOptions {
  requestUrl: string
}

export interface reportTrackerData {
  [key: string]: any
  event: string
  targetKey: string
}
