import AppDispatcher from '../AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

let TodoActions = {

  /**
  * Creates a new todo item
  * @param {string} text The text of a todo item
  */
  create: function (text) {
    AppDispatcher.dispatchViewAction({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  /**
  * Deletes a todo item
  * @param {string} id The id of a todo item
  */
  destroy: function (id) {
    AppDispatcher.dispatchViewAction({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  }
};

module.exports = TodoActions;
