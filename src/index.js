import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { App } from './app'
import { makeHTTPDriver } from '@cycle/http';

const main = App

const drivers = {
  DOM1: makeDOMDriver('#app'),
  DOM: makeDOMDriver('#app'),
  DOMClick: makeDOMDriver('#app1'),
  HTTP: makeHTTPDriver()
}

run(main, drivers)