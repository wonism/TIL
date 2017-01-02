import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AccountBalanceStore from '../data/AccountBalanceStore';
import AccountActions from '../data/AccountActions';

class AppView extends Component {
  constructor(props) {
    super(props);
    AccountActions.createAccount();
    this.state = {
      balance: AccountBalanceStore.getState(),
    };
    this.deposit = this.deposit.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  componentDidMount() {
    this.storeSubscription = AccountBalanceStore.addListener(data => this.handleStoreChange(data));
  }

  componentWillUnmount() {
    this.storeSubscription.remove();
  }

  handleStoreChange() {
    this.setState({
      balance: AccountBalanceStore.getState(),
    });
  }

  deposit() {
    const amount = document.getElementById('amount');

    AccountActions.depositIntoAccount(+amount.value);
    amount.value = '';
  }

  withdraw() {
    const amount = document.getElementById('amount');

    AccountActions.withdrawFromAccount(+amount.value);
    amount.value = '';
  }

  render() {
    return (
      <section>
        <header>
          <h1>Flux Bank Account Application</h1>
        </header>
        <div>
          <h3>{`Your balance is ${this.state.balance}.`}</h3>
          <fieldset>
            <legend>입/출금 금액</legend>
            <label htmlFor="amount">금액</label>
            <input id="amount" type="text" pattern="\d+" placeholder="Enter amount.." />
            <button onClick={ this.withdraw }>출금</button>
            <button onClick={ this.deposit }>입금</button>
          </fieldset>
        </div>
      </section>
    );
  }
}

export default AppView;

