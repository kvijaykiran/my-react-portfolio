import React from 'react';
import { Provider } from 'react-redux';
import BabylonScene from './BabylonScene';
import store from './redux/store';

//   console.log("vite base url: ", import.meta.env.VITE_BASE_URL);

const App: React.FC = () => (
  <Provider store={store}>
    <BabylonScene />
  </Provider>
);

export default App;
