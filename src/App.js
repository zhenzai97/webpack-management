import 'antd/dist/antd.css';
import React from 'react';
import {BrowserRouter as Router, HashRouter,Route,Switch} from "react-router-dom";
// import {Route} from 'react-router'
import LoginPage from '@/views/login/LoginPage';
import AdminPage from '@/views/admin/AdminPage';
import '../src/styles/index.less'

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className="main-body">
                    <Switch>
                        <Route path="/" exact component={LoginPage}/>
                        <Route path="/main" exact component={AdminPage}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }

}

export default App;
