import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AdminPage extends Component {
    render() {
        return (
            <div className='admin'>
                <div className='admin-header'>
                    头部
                </div>
                <div className="admin-menu-root">
                    左侧菜单
                </div>
                <div className='admin-center-page'>
                    中1部
                </div>
            </div>
        );
    }
}

AdminPage.propTypes = {};

export default AdminPage;
