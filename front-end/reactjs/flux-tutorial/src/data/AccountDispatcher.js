import { Dispatcher } from 'flux';

class AccountDispatcher extends Dispatcher {
  dispatch(action = {}) {
    console.log('Dispatched! Action is..', action);
    super.dispatch(action);
  }
}

export default new AccountDispatcher();

