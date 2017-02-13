import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Stage from './containers/stage';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';

const store  = configureStore();
// Render the main component into the dom
ReactDOM.render(
	<Provider store={store}>
		<Stage />
	</Provider>, document.getElementById('app'));
