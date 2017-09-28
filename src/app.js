import {
  div,
  h1,
  span,
  p,
  input,
  button,
  h4,
  a
} from '@cycle/dom'
import xs from 'xstream'
import {
  html
} from 'snabbdom-jsx';
import {
  makeHTTPDriver
} from '@cycle/http';

export function App(sources) {
  const vtree$ = xs.periodic(1000).map(i =>
    div([
      p(new Date() + " "),
      'My Awesome Cycle.js app! ',
      span(i)
    ])
  )
  const cycle$ = xs.of( 
    <h1 className = "get-random" >
    <span > 嘿嘿， </span>
    你好啊， Cycle 
    </h1>
  )

  // http
  const getRandomUser$ = sources.DOM.select('.get-random').events('click')
    .map(() => {
      const randomNum = Math.round(Math.random() * 9) + 1;
      return {
        url: 'https://jsonplaceholder.typicode.com/users/' + String(randomNum),
        category: 'user',
        method: 'GET'
      };
    })

  const user$ = sources.HTTP.select('user')
    .flatten()
    .map(res => res.body);
  // 渲染
  const vdom$ = user$.map(user =>
    div('.users', [
      user === null ? null : div('.user-details', [
        h1('.user-name', user.name),
        h4('.user-email', user.email),
        a('.user-website', {
          attrs: {
            href: user.website
          }
        }, user.website)
      ])
    ])
  );

  const sinks = {
    DOM1: cycle$,
    DOM: vdom$,
    HTTP: getRandomUser$,
    DOMClick: sources.DOMClick.select('input').events('change')
      .map(ev => ev.target.checked)
      .startWith(false)
      .map(toggled =>
        <div>
        <input type = "checkbox" /> Toggle me 
        <p> {
          toggled ? 'NO' : 'OFF'
        } </p>  
        </div >
      )
  }
  return sinks
}