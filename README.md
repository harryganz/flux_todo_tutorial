# React Flux Todo

### Description

This is my attempt at making a todo list in Flux with react. It is a simpler version of [this tutorial](https://facebook.github.io/flux/docs/todo-list.html) from the Flux website.

### Dependencies

1. node >5
2. npm ~3.10.1

### Getting Started

This project assumes familiarity with [React and ES6](https://facebook.github.io/react/docs/reusable-components.html#es6-classes). It might also be useful to know [webpack](http://webpack.github.io/docs/), but if you don't, just try to ignore all of the magic holding the app. together.

I made this project by starting with boilerplate generated from [react-create-app](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html). If you haven't taken a look at it, I would recommend it. It has most of the configuration you would need to set up a simple application in node and react, and uses webpack to bundle the javascript and insert all of the dependencies.

To get started, first install all of the dependencies:
```
npm install
```

Then start the dev server:
```
npm start
```

It will hot-load any changes you make to the src folder. That's all there is to it.

### Making the Dispatcher

The Dispatcher handles getting actions, the state transformations, from the view or server and sending them to the store(s) to be handled. The code for the dispatcher appears in src/AppDispatcher.js.

I used Object.assign to extend the Dispatcher. The Dispatcher prototype comes with a method, dispatch, that passes the action from the view or server to the store which handles the actual state transformation. In this case, I extended the Dispatcher prototype to include a dispatchViewaction which also includes the source. This allows me to modify the state differently when an action comes from the view or from the server.

### Minding the Store

Stores in Flux are where bits of the application state are stored. They handle reading the data, and subscribe a method with the Dispatcher that modifies the state. The state should be read only, and should only be changed though the method subscribed to the dispatcher. This insures that the data flows only in one direction (view -> dispatcher -> store -> view) and is modified in a consistent manner whenever an action is dispatched.

The code for the Todo store is in src/stores/TodoStore.js

You'll notice that I have extended the EventEmitter prototype to create the store. This allows me to subscribe view components to the store and to automatically render changes whenever the state is changed.

Another important feature of the store is the dispatcherId property. It is generated by a special instance method of the Dispatcher: register. The register method allows a function to be subscribed to the Dispatcher, and calls that function every time an action is dispatched to the Dispatcher. In this callback is all the logic needed for modifying the state of the store. It also emits an event every time the state changes, so the view can trigger a re-render.

### Actions

It is possible to manually dispatch actions to the Dispatcher, but it makes sense to create action factories which can bu used throughout the application. In src/TodoActions.js I export two functions: one to create new todo items and the other to destroy todo items in the store.

### Flux in React

Probably the most difficult part of using Flux is attaching it to the view. The convention is to use two different type of components: presentational components and container components.

Presentational components do not hold any state and simply render things to the view and handle DOM events. All data and methods modifying state should be passed to them through props. In this application the TodoForm, TodoItem, and TodoList components are all presentational.

Container components handle getting state from the store and dispatching actions to the Dispatcher, but do not have any real rendering logic. Instead, their render methods simply render presentational components and pass the data and methods in as props.

The only container component in this application is App.

### More Resources

Unfortunately, the documentation for Flux is sparse https://facebook.github.io/flux/docs/overview.html#content, but you can take a look at it if you want. Honestly, I think the best way to understand Flux is to read the Redux documentation (http://redux.js.org/index.html), as it covers most of the conceptual background for Flux, then read the flux API (https://facebook.github.io/flux/docs/dispatcher.html#content) to figure out how to actually implement it.

### Flux Vs. Redux

Conceptually, Flux and Redux are very similar. They both use one-way data flow, they both allow changes to be dispatched to the store(s) and subscribed to from the store(s).

There are two main differences between Redux and Flux:

1. Redux has only one store, Flux can have multiple
  * In both Flux and Redux all changes are dispatched to every store, but Flux allows you to create multiple stores that can each have their own associated event. This allows you to subscribe parts of your app to only a portion of the state.
2. Redux requires the store to be managed by a Reducer function, Flux stores can be  managed by any sort of function
  * A Redux store is defined by a pure Reducer function that takes the current state of the store and the action as arguments. Flux stores have no such restriction. That being said, using a Reducer is a very good way of implementing a Flux store.

Flux is like a superset of Redux. Flux allows you a bit more flexibility in how you do things, but it doesn't handle as much of the boilerplate. Redux makes some choices for you, but restricts the ways in which you can arrange and modify your application state. I personally believe that Redux is sufficient for most web applications, but if you find yourself wanting to break convention and do something very unusual with how you handle applicaiton state, Flux might be the better choice.
