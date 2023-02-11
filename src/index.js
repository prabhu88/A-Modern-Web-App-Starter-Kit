import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './app.js';
import store from './redux/store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(document.getElementById("root"));
window.onload = () => {
    root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>        
        </Provider>
    </React.StrictMode>
    )
};
