import {
    Emitter,
    EVENT_TYPE
  } from '../emitter'

interface FetchParameters {
    path: string
    data?: Record<string, any>
}

interface DoFetchParamaters extends FetchParameters {
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'GET'
}

function doFetch ({ path }: DoFetchParamaters): Promise<any> {
    return handleFetchResponse(path, fetch(path))
  }

const eventMethods = ['GET']

function handleFetchResponse (path: string, promise: Promise<any>, method: string = 'GET'): Promise<any> {
    return promise.then((response) => {
        console.log({response})
      if (response.status >= 200 && response.status < 300) {
        if (eventMethods.indexOf(method) > -1) {
          let eventURL = path
          if (method !== 'POST') {
            eventURL = eventURL.substring(1, eventURL.lastIndexOf('/') - 1)
          }
          Emitter.emit(EVENT_TYPE.DATA_CHANGED, {
            path,
            eventURL,
            method,
          })
        }
        if (response.status === 204) {
          return Promise.resolve(true)
        }
        return response.json()
      } else {
        return response.json().then((js: any) => {
          if (js.errors) {
            const msg = js.errors.map((e: any) => e.title + ' - ' + e.detail).join(', ')
            return handleErrorResponse(path, response.status, msg, msg)
          } else {
            return response.text().then((txt: string) => {
              return handleErrorResponse(path, response.status, txt, null)
            })
          }
        }).catch((err: Error) => {
          const parts = err.message.split(':|:')
          if (parts.length > 1) {
            let errMsg = parts[0]
            if (parts[1] !== '') {
              errMsg += ':|:' + parts[1]
            }
            throw Error(errMsg)
          } else {
            return handleErrorResponse(path, response.status, err.message, null)
          }
        })
      }
    })
  }

function handleErrorResponse (path: string, status: any, err: string, msg: string | null): any {
    console.error('Server returned ' + status + ' status', path, err)
    if (msg !== null) {
      msg = ':|:' + msg
    } else {
      msg = ':|:'
    }
    switch (status) {
      case 400:
        throw Error('bad_request' + msg)
      case 401:
        throw Error('unauthorized' + msg)
      case 403:
        throw Error('forbidden' + msg)
      case 404:
        throw Error('not_found' + msg)
      case 409:
        throw Error('duplicate_violation' + msg)
      case 422:
        throw Error('unprocessable_entity' + msg)
      case 501:
        throw Error('not_implemented' + msg)
      case 502:
        throw Error('bad_gateway' + msg)
      case 504:
        throw Error('gateway_timeout' + msg)
      case 500:
      default:
        throw Error('system_error' + msg)
    }
  }

export function doGet<T = any> ({ path }: FetchParameters): Promise<T> {
    return doFetch({ path, method: 'GET' })
  }