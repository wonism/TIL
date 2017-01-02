import AccountDispatcher from './AccountDispatcher';
import AccountActionTypes from './AccountActionTypes';

const AccountActions = {
  createAccount() {
    AccountDispatcher.dispatch({
      type: AccountActionTypes.CREATED_ACCOUNT,
      amount: 0,
    });
  },

  depositIntoAccount(amount) {
    AccountDispatcher.dispatch({
      type: AccountActionTypes.DEPOSITED_INTO_ACCOUNT,
      amount: amount,
    });
  },

  withdrawFromAccount(amount) {
    AccountDispatcher.dispatch({
      type: AccountActionTypes.WITHDREW_FROM_ACCOUNT,
      amount: amount,
    });
  }
};

export default AccountActions;

