import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStore(initialState){

	const middleware = applyMiddleware(thunkMiddleware);

	// 下面两段代码没怎么太明白是什么意思，猜测应该是判断浏览器是否是chrome，如果webpack热加载了就替换store
	const store = (window.devToolsExtension ? window.devToolsExtension()(middleware(createStore)) :
		middleware(createStore))(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}