import EventEmitter from 'eventemitter3'

enum EVENT_TYPE {
  DATA_CHANGED = 'DATA_CHANGED',
  OPTIMISTIC_UPDATE = 'OPTIMISTIC_UPDATE',
}

const eventEmitter = new EventEmitter()

const Emitter = {
  on: (event: EVENT_TYPE, fn: any) => eventEmitter.on(event, fn),
  once: (event: EVENT_TYPE, fn: any) => eventEmitter.once(event, fn),
  off: (event: EVENT_TYPE, fn: any) => eventEmitter.off(event, fn),
  emit: (event: EVENT_TYPE, payload: object) => eventEmitter.emit(event, payload)
}

Object.freeze(Emitter)

export { Emitter, EVENT_TYPE }