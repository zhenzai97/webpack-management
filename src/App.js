import 'antd/dist/antd.css';
import React from 'react';
import {BrowserRouter as Router, HashRouter,Route,Switch} from "react-router-dom";
import LoginPage from '@/views/login/LoginPage';
import AdminPage from '@/views/admin/AdminPage';
import '../src/styles/index.less'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <ConfigProvider locale={zhCN}>
                    <div className="main-body">
                        <Switch>
                            <Route path="/" exact component={LoginPage}/>
                            <Route path="/main" exact component={AdminPage}/>
                        </Switch>
                    </div>
                </ConfigProvider>
            </HashRouter>
        )
    }

}

export default App;
