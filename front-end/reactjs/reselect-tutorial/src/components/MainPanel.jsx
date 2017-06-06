import React from 'react';
import PropTypes from 'prop-types';
import { isERROR } from '../constants';
import Validator from './Validator';
import ValidationHelper from './ValidationHelper';

const MainPanel = ({ state, validation, actions }) => (
  <div id="main-panel">
    <h1>Componay</h1>
    <ValidationHelper status={validation.result} />
    <section>
      <Validator
        type="name"
        value={state.name}
        onChange={actions.changeName}
      />
      <ValidationHelper status={validation.name} />
    </section>
    <section>
      <Validator
        type="nationality"
        value={state.nationality}
        onChange={actions.changeNationality}
      />
      <ValidationHelper status={validation.nationality} />
    </section>
    <section>
      <Validator
        type="phone-number"
        value={state.phoneNumber}
        onChange={actions.changePhoneNumber}
      />
      <ValidationHelper status={validation.phoneNumber} />
    </section>
    <input
      id="clear-button"
      value="CLEAR"
      type="button"
      onClick={actions.clearAll}
    />
  </div>
);

MainPanel.propTypes = {
  state: PropTypes.object.isRequired,
  validation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default MainPanel;

