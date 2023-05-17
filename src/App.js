import React from 'react';
import { Provider } from 'react-redux';
import store from './stores/store';
import Autocomplete from './components/Autocomplete';

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <Autocomplete />
            </div>
        </Provider>
    );
};

export default App;
