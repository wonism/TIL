import { EventEmitter } from 'fbemitter';
import AccountDispatcher from './AccountDispatcher';
import AccountActionTypes from './AccountActionTypes';

const CHANGE_EVENT = 'change';
const __emitter = new EventEmitter();
let balance = 0;

const AccountBalanceStore = {
  getState() {
    return balance;
  },

  addListener(cb) {
    console.log(CHANGE_EVENT, cb);
    return __emitter.addListener(CHANGE_EVENT, cb);
  }
};

AccountBalanceStore.dispatchToken = AccountDispatcher.register(action => {
  switch (action.type) {
  case AccountActionTypes.CREATED_ACCOUNT:
    balance = 0;
    __emitter.emit(CHANGE_EVENT);
    break;
  case AccountActionTypes.DEPOSITED_INTO_ACCOUNT:
    balance += action.amount;
    __emitter.emit(CHANGE_EVENT);
    break;
  case AccountActionTypes.WITHDREW_FROM_ACCOUNT:
    balance -= action.amount;
    __emitter.emit(CHANGE_EVENT);
    break;
  }
});

export default AccountBalanceStore;

