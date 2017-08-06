import React from 'react';
import { render } from 'react-dom';
import './application.scss';

const root = document.querySelector('#root');
const App = () => (<h1>Hello, World!</h1>);

render(<App />, root);
