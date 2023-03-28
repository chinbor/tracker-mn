/* eslint-disable unused-imports/no-unused-vars */
import { describe, test } from 'vitest'
import { Tracker } from '../src/index'

describe('tracker', () => {
  test('history', () => {
    const tracker = new Tracker({
      requestUrl: 'http://localhost:9000/tracker',
      historyTracker: true,
    })

    history.pushState('asda', '', '/a')
  })

  test('hash', () => {
    const tracker = new Tracker({
      requestUrl: 'http://localhost:9000/tracker',
      hashTracker: true,
    })

    location.href += '#/123'
  })

  test('event', () => {
    const btn = document.createElement('button')
    btn.setAttribute('target-key', 'btn')

    document.body.appendChild(btn)

    const tracker = new Tracker({
      requestUrl: 'http://localhost:9000/tracker',
      domTracker: true,
    })

    const click = new Event('click', {
      bubbles: true, // 设置为可冒泡
      cancelable: false,
      composed: false,
    })

    const dblclick = new Event('dblclick', {
      bubbles: true, // 设置为可冒泡
      cancelable: false,
      composed: false,
    })

    btn.dispatchEvent(click)
    btn.dispatchEvent(dblclick)
  })

  test('error', () => {
    const tracker = new Tracker({
      requestUrl: 'http://localhost:9000/tracker',
      jsError: true,
    })

    const error = new ErrorEvent('error', new Error('This is error'))

    const unhandledrejection = new PromiseRejectionEvent('unhandledrejection', {
      promise: Promise.reject(new Error('This is PromiseRejection error')),
      reason: 'wtf',
    })

    window.dispatchEvent(error)
    window.dispatchEvent(unhandledrejection)
  })
})
