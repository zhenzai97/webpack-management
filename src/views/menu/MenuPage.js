import React, {useEffect, useState} from 'react';
import {Icon, Menu} from 'antd';

const {SubMenu} = Menu;

export function MenuPage() {
    const [menuList, setMenuList] = useState(
        [
            {key: 1, icon:'',menuName: "文章管理", uuid: '13323',
                children:[
                    {key: 12, icon:'',menuName: "文章管理", uuid: '13323'},
                    {key: 13, icon:'',menuName: "文章管理", uuid: '13323'},
                    {key: 14, icon:'',menuName: "文章管理", uuid: '13323'}
                ]
            },
            {key: 2, icon:'',menuName: "特效管理", uuid: '12323',
                children:[
                    {key: 22, icon:'',menuName: "特效管理", uuid: '13323'},
                    {key: 23, icon:'',menuName: "特效管理", uuid: '13323'},
                    {key: 24, icon:'',menuName: "特效管理", uuid: '13323'}
                ]
            },
            {key: 3, icon:'',menuName: "每日一练", uuid: '14323',
                children:[
                    {key: 32, icon:'',menuName: "每日一练", uuid: '13323'},
                    {key: 33, icon:'',menuName: "每日一练", uuid: '13323'},
                    {key: 34, icon:'',menuName: "每日一练", uuid: '13323'}
                ]
            },
        ]
    );

    useEffect(() => {// 初始化

    });

    function handleClick(e) {

    }

    return (
        <div>
            <Menu
                onClick={(e) => handleClick(e)}
                style={{width: 160}}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >

                {menuList.map((item,index) =>{
                    return(
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                {/*<Icon type="appstore"/>*/}
                                <span>{item.menuName}</span>
                            </span>
                            }
                        >
                            {item.children.map(el=>{
                                return(<Menu.Item key={el.key}>{el.menuName}</Menu.Item> )
                            })}
                        </SubMenu>
                    )
                })}
            </Menu>
        </div>
    )

}



