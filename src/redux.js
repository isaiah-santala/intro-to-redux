import React from 'react'
import ReactDOM from 'react-dom'

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': 
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const Counter = ({ 
  value, 
  increment, 
  decrement
 }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>
);

import { createStore } from 'redux';
const store = createStore(counter);

const ACTIONS = {
  counter: {
    increment: () => store.dispatch({
      type: 'INCREMENT'
    }),
    decrement: () => store.dispatch({
      type: 'DECREMENT'
    })
  }
}

const render = () => {
  ReactDOM.render(
    <Counter 
      value={store.getState()}
      increment={ACTIONS.counter.increment}
      decrement={ACTIONS.counter.decrement}
    />, 
    document.getElementById('App')
  );
};

store.subscribe(render);
render();
