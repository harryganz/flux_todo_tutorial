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

## Understanding Flux

Flux applications consist of three parts:

1. The Dispatcher - Listens for 'dispatch' actions. When an action is dispatched, it will execute all of the callbacks that are registered with it and pass in the 'payload' (the data) as an argument.
2. The Store - A Javascript object that holds the data, defines getters that read all or part of the data, and listens for dispatch events by registering one or more functions with the dispatcher. When a dispatch event is fired, it modifies the data based on logic within the registered callback(s).
3. The View/Controller: Sends 'dispatch' actions to to the dispatcher, and renders a view based on the current state of the store. The view is not technically part of Flux, and can be implemented using any front-end framework or library (e.g. React, Angular, Backbone).

Flux differs from a traditional publish and subscribe (pub/sub) service because all subscribers listen for and have access to all published data. This can make it easy to expand the functionality of a store, to use multiple stores to determine how the view should be rendered, or to update one store based on the state of one or more other stores.

## The Dispatcher

The dispatcher has five methods associated with it:

1. register: Takes a function callback as an argument that it calls whenever any action is dispatched. Returns a token - the unique id of the registered callback (used by waitFor). All the callbacks registered with the dispatcher take one argument, the 'payload', a javascript object created when an action is dispatched.
2. dispatch: Takes a javascript object, the 'payload', as an argument. Calling this function will trigger the dispatcher to call all of the registered callbacks and inject the payload into them.
3. waitFor: Takes an array of callback ids to wait for before continuing execution of the current callback. Useful in ensuring that stores are updated in the correct order.
4. unregister: Takes a callback id. Removes the callback from the list of registered callbacks.
5. isDispatching: Takes no arguments. Returns a boolean indicating that the dispatcher is currently dispatching.
