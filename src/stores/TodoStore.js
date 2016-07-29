import AppDispatcher from '../AppDispatcher';
import TodoConstants from '../constants/TodoConstants';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _todos = {}; // Collection of todos

/**
* Create a todo item.
* @param {string} text The content of the todo item
*/
function create (text) {
  // Use the current timestamp as an id
  let id = Date.now();
  _todos[id] = Date.now();
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
* Delete a todo item\
* @param {string} id
*/
function destroy (id) {
  delete _todos[id];
}

let TodoStore = Object.assign(new EventEmitter(), {

  /**
  * Get the entire collection of todos
  * @return {object}
  */
  getAll: function () {
    return _todos;
  },

  // Emit change event for this store
  // extends emit function in EventEmitter
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  /**
  * Add a listener to the store
  * @param {function} callback Function which executes when
  * change event fired.
  */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
  * Remove event listener from this store
  * @param {function} Function to remove from listeners registered
  * with this store.
  */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // The index of this store's callback in the dispatcher
  dispatcherIndex: AppDispatcher.register(function (payload) {
    let action = payload.action;
    let text;

    switch (action.actionType) {
      case TodoConstants.TODO_CREATE:
        text = action.text.trim();
        if (text) {
          create(text);
          TodoStore.emitChange();
        }
        break;
      case TodoConstants.TODO_DESTROY:
        destroy(action.id);
        TodoStore.emitChange();
        break;
      default:
        // Do Nothing
    }

    return true; // No errors thrown
  })
});

module.exports = TodoStore;
