import { combineReducers, createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO': 
      return state.id === action.id ?
        Object.assign({}, state, {
          completed: !state.completed
        }) : state;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  console.log('todos', state, action)
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, 
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

let nextTodoId = 0;
const ToDo = ({ todos }) => (
  <div>
    <button
      onClick={() => store.dispatch({
        type: 'ADD_TODO',
        text: 'new todo',
        id: nextTodoId++
      })}
    >add todo</button>
    <ul>
      {todos.map((todo, i) => 
        <li key={i}>
          {todo.text}
        </li>
      )}
    </ul>
  </div>
);

const render = () => {
  ReactDOM.render(
    <ToDo 
      todos={store.getState().todos}
    />,
    document.getElementById('App')
  )
};

store.subscribe(todoApp);
render();