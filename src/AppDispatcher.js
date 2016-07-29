import {Dispatcher} from 'flux';

module.exports = Object.assign(new Dispatcher(), {
  /**
  * Extend dispatcher to specify source of action
  * as coming from the view.
  * @param {object} action The data coming from the view
  */
  dispatchViewAction: function (action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});
