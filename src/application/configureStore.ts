import { configureStore, Store } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/rootSaga';
import rootReducer from './slices/rootReducer';

const sagaMiddleware = createSagaMiddleware();

export const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;