import React, { Component } from "react";
import DemoIndex from "@/views/middleContent/Demo1";
import DemoHook from "@/views/middleContent/DemoHook";
import App from "@/views/middleContent/App";
class AdminPage extends Component {
  render() {
    return (
      <div className="admin">
        <div className="admin-header">头部</div>
        <div className="admin-menu-root">左侧菜单</div>
        <div className="admin-center-page">
          <DemoIndex />
          <DemoHook />
          <App />
        </div>
      </div>
    );
  }
}

AdminPage.propTypes = {};

export default AdminPage;
