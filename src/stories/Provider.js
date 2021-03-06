import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from '../Store/configureStore';

const store = configureStore();

export default function Provider({ story }) {
  return (
    <ReduxProvider store={store}>
      {story}
    </ReduxProvider>
  );
};