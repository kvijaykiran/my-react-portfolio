import React from 'react';
import { Provider } from 'react-redux';
import BabylonScene from './BabylonScene';
import store from './redux/store';
import Header from './components/Header';
import './styles/_app.scss';

//   console.log("vite base url: ", import.meta.env.VITE_BASE_URL);

const App: React.FC = () => (
  <div className='App'>
    <Header />
  <Provider store={store}>
    <BabylonScene />
  </Provider>

  </div>
);

export default App;
