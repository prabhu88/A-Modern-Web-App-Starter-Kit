import React, {useState, useEffect,Suspense} from 'react';
import {HashRouter,Route,Switch,useHistory,NavLink} from 'react-router-dom'
import {api} from './api';
import Login from './views/Login'
const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse">loading</div>
    </div>
)
const App = () => {
    const [successText, setSuccessText] = useState(null);
    const navigate = useHistory()
    useEffect(() => {
        api.get('/test')
            .then(({data}) => setSuccessText(data))
            .catch(err => console.error(err));
    });

    const click_call = (e) => {
        e.preventDefault();
        navigate.push('#/login')
    }
    return (
        <HashRouter>
            <Suspense fallback={loading}>
                <Switch>
                    <Route path="/login" render={(props)=> <Login {...props} />} />
                </Switch>
            </Suspense>
            <div>
                <h2>Electron is running! sss</h2>
                <p>Fetched api response from server: {successText}</p>
                <NavLink className="btn btn-primary" to="/login" >
                    Login
                </NavLink>
            </div>
        </HashRouter>
        
    );
};

export default App;
