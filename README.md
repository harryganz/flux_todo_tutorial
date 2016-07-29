# React Flux Todo

### Description

This is my attempt at making a todo list in Flux with react. It is a simpler version of [this tutorial](https://facebook.github.io/flux/docs/todo-list.html) from the Flux website.

### Dependencies

1. node >5
2. npm ~3.10.1

### Getting Started

I made this project by starting with boilerplate generated from [react-create-app](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html). If you haven't taken a look at it, I would recommend it. It has most of the configuration you would need to set up a simple application in node and react.

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

Flux applications consist of two basic parts:

1. The Dispatcher - Listens for 'dispatch' actions. When an action is dispatched, it will execute all of the callbacks that are registered with it and pass in the 'payload' (the data) as an argument.
2. The Store - A Javascript object that holds the data, defines getters that read all or part of the data, and listens for dispatch events by registering one or more functions with the dispatcher. When a dispatch event is fired, it modifies the data based on logic within the registered callback(s).

This differs from a traditional publish and subscribe (pub/sub) service because all subscribers listen for and have access to all published data. I'm sure facebook has a good reason why they did it that way, but I don't know it.

## The Dispatcher

The dispatcher has five methods associated with it:

1. register: Takes a function callback as an argument that it calls whenever an action is dispatched. Returns a token - the unique id of the registered callback (used by waitFor). All the callbacks registered with the dispatcher take one argument, the 'payload', which is an object injected into the callback by the dispatcher whenever dispatch is called.
2. dispatch: Takes a javascript object, the 'payload', as an argument. Calling this function will trigger the dispatcher to call all of the registered callbacks and inject the payload into them.
3. waitFor: Takes an array of callback ids to wait for before continuing execution of the current callback. Useful in ensuring that stores are updated in the correct order.
4. unregister: Takes a callback id. Removes the callback from the list of registered callbacks.
5. isDispatching: Takes no arguments. Returns a boolean indicating that the dispatcher is currently dispatching.
