import { MouseEventList, TrackerConfig } from './config'
import type { DefaultOptions, Options, reportTrackerData } from './types'
import { createHistoryEvent } from './utils'

export class Tracker {
  public data: Options

  constructor(options: Options) {
    this.data = Object.assign(this.initDef(), options)
    this.installTracker()
  }

  public setUserId<T extends DefaultOptions['uuid']>(uuid: T) {
    this.data.uuid = uuid
  }

  public setExtra<T extends DefaultOptions['extra']>(extra: T) {
    this.data.extra = extra
  }

  public sendTracker(data: reportTrackerData) {
    this.reportTracker(data)
  }

  private initDef(): DefaultOptions {
    window.history.pushState = createHistoryEvent('pushState')
    window.history.replaceState = createHistoryEvent('replaceState')

    return <DefaultOptions>{
      sdkVersion: TrackerConfig.version,
      historyTracker: false,
      hashTracker: false,
      domTracker: false,
      jsError: false,
    }
  }

  private targetKeyReport() {
    for (const event of MouseEventList) {
      window.addEventListener(event, (e) => {
        const target = e.target as HTMLElement

        const targetKey = target.getAttribute('target-key')

        if (targetKey) {
          this.reportTracker({
            event,
            targetKey,
          })
        }
      })
    }
  }

  private captureEvents<T>(mouseEventList: string[], targetKey: string, data?: T) {
    for (const event of mouseEventList) {
      window.addEventListener(event, () => {
        this.reportTracker({
          event,
          targetKey,
          data,
        })
      })
    }
  }

  private installTracker() {
    const { historyTracker, hashTracker, domTracker, jsError } = this.data

    if (historyTracker)
      this.captureEvents(['pushState', 'replaceState', 'popstate'], 'history-pv')

    if (hashTracker)
      this.captureEvents(['hashchange'], 'hash-pv')

    if (domTracker)
      this.targetKeyReport()

    if (jsError)
      this.jsError()
  }

  private jsError() {
    this.errorEvent()
    this.promiseReject()
  }

  private errorEvent() {
    window.addEventListener('error', (e) => {
      this.reportTracker({
        targetKey: 'message',
        event: 'error',
        message: e.message,
      })
    })
  }

  private promiseReject() {
    window.addEventListener('unhandledrejection', (event) => {
      event.promise.catch((e) => {
        this.reportTracker({
          targetKey: 'message',
          event: 'promiseReject',
          message: e.message,
        })
      })
    })
  }

  private reportTracker(data: reportTrackerData) {
    const params = Object.assign(this.data, data, { time: new Date().getTime() })

    const headers = {
      type: 'application/x-www-form-urlencoded',
    }

    const blob = new Blob([JSON.stringify(params)], headers)

    navigator.sendBeacon(this.data.requestUrl, blob)
  }
}
