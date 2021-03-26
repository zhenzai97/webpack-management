import React, {Component} from "react";
import {Icon, Menu, Tabs} from "antd";

const {SubMenu} = Menu;
const {TabPane} = Tabs;

class AdminPage extends Component {
    constructor(props) {
        super(props);
        const panes = [
            {title: '首页', content: '首页', key: '1'},
        ];
        this.state = {
            menuList: [
                {
                    key: 1, icon: '', menuName: "文章管理", uuid: '13323',
                    children: [
                        {key: 112, icon: '', menuName: "文章管理1", uuid: '13323', keyPath: '/'},
                        {key: 13, icon: '', menuName: "文章管理2", uuid: '13323', keyPath: '/'},
                        {key: 14, icon: '', menuName: "文章管理3", uuid: '13323', keyPath: '/'}
                    ]
                },
                {
                    key: 2, icon: '', menuName: "特效管理", uuid: '12323',
                    children: [
                        {key: 22, icon: '', menuName: "特效管理4", uuid: '13323', keyPath: '/'},
                        {key: 23, icon: '', menuName: "特效管理5", uuid: '13323', keyPath: '/'},
                        {key: 24, icon: '', menuName: "特效管理6", uuid: '13323', keyPath: '/'}
                    ]
                },
                {
                    key: 3, icon: '', menuName: "每日一练", uuid: '14323',
                    children: [
                        {key: 32, icon: '', menuName: "每日一练7", uuid: '13323', keyPath: '/'},
                        {key: 33, icon: '', menuName: "每日一练8", uuid: '13323', keyPath: '/'},
                        {key: 34, icon: '', menuName: "每日一练9", uuid: '13323', keyPath: '/'}
                    ]
                },
            ],
            activeKey: panes[0].key,
            panes,
        }

    }

    componentDidMount() {

    }

    handleClick(item) {
        const {menuList, panes} = this.state
        let itemKeyPath = item.keyPath
        let tempPanes = panes

        let tempTitle = menuList[Number(itemKeyPath[1]) - 1].children.filter(el => el.key === Number(itemKeyPath[0]))
        let tempPath = tempPanes.map(el => {
            return Number(el.key)
        })
        if (tempPath.indexOf(Number(itemKeyPath[0])) === -1) {
            tempPanes.push({
                'title': tempTitle[0].menuName,
                'keyPath': tempTitle[0].keyPath,
                'key': tempTitle[0].key,
                'content': tempTitle[0].menuName,
            })
            this.setState({panes: tempPanes})
        }
        this.setState({activeKey: tempTitle[0].key + ''})

    }

    tabOnChange(e) {
        this.setState({activeKey: e});
    }

    tabClose(event, key) {
        event && event.preventDefault();
        event && event.stopPropagation();
        let tempList = this.state.panes.filter(el => el.key !== key)
        this.setState({panes: tempList})
    }


    renderTabs() {
        return this.state.panes.map((pane, index) => {
            let tab = <div className='tab-contains'>
                <span className='tab-contains-name'>
                    {pane.title}
                </span>
                <span className='tab-contains-icon'>
                    {index !== 0 && <Icon type="close" onClick={(e) => this.tabClose(e, pane.key)}/>}
                </span>
            </div>
            return (
                <TabPane tab={tab} key={pane.key}>
                    {pane.content}
                </TabPane>
            )
        })
    }


    render() {
        const {menuList} = this.state
        return (
            <div className="admin">
                <div className="admin-header">头部</div>
                <div className="admin-menu-root">
                    <Menu
                        onClick={(item) => this.handleClick(item)}
                        style={{width: 160}}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >

                        {menuList.map((item, index) => {
                            return (
                                <SubMenu
                                    key={item.key}
                                    title={
                                        <span>
                                {/*<Icon type="appstore"/>*/}
                                            <span>{item.menuName}</span>
                            </span>
                                    }
                                >
                                    {item.children.map(el => {
                                        return (<Menu.Item key={el.key}>{el.menuName}</Menu.Item>)
                                    })}
                                </SubMenu>
                            )
                        })}
                    </Menu>
                </div>
                <div className="admin-center-page">
                    <Tabs
                        hideAdd
                        onChange={(e) => this.tabOnChange(e)}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                    >
                        {this.renderTabs()}
                    </Tabs>
                </div>
            </div>
        );
    }
}

AdminPage.propTypes = {};

export default AdminPage;
