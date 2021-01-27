import React, {Component} from 'react';
import {Button, Form, Icon, Input} from 'antd';
import imge_3 from '@/images/login/3.jpg';
import imge_4 from '@/images/login/4.jpg';
import imge_5 from '@/images/login/5.jpg';
import imge_6 from '@/images/login/6.jpg';

const FormItem = Form.Item;
let tempIndex = 1;

import Axios from '../../utils/ajaxUtil';
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgIndex: 0,
        }
    }

    handleSubmit() {

        let data = {userAccount: 'admin', userPassword: 'a123456'}
        // Axios({
        //     url: '/api/user/demo',
        //     data: data,
        //     loadingMessage: '正在登录',
        // });
        Axios({
                url: '/api/user/demo',
                data: data,
                success: result => {

                }
            }
        );
        // this.props.history.push('/main');
        // return new Promise((resolve, reject) => {
        //     AxiosPromise({
        //         url: '/api/user/demo',
        //         method: 'post',
        //         body: {account: 'admin', password: 'a123456'}
        //     }).then(res => {
        //         resolve(res)
        //     })
        // })
    }

    imgSlider(imgSrc, index) {
        if (index === 1) {
            tempIndex++
            if (tempIndex > 2) {
                this.props.history.push('/main');
            }
        } else {
            tempIndex = 1
        }
        this.setState({imgIndex:index})
        document.getElementById('slider').src = imgSrc
    }

    render() {
        const {imgIndex} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 8},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 12},
                sm: {span: 12},
            },
        };

        const {getFieldDecorator} = this.props.form;
        return (
            <section className='login-contains'>
                <img src={imge_3} align="" id="slider"/>
                <ul className="navigation">
                    <li><img onClick={() => this.imgSlider(imge_3, 1)} src={imge_3} align=""/></li>
                    <li><img onClick={() => this.imgSlider(imge_4)} src={imge_4} align=""/></li>
                    <li><img onClick={() => this.imgSlider(imge_5)} src={imge_5} align=""/></li>
                    <li><img onClick={() => this.imgSlider(imge_6)} src={imge_6} align=""/></li>
                </ul>
                {imgIndex === 1 && (<div className='login-contains-page'>
                    <div className="login-contains-page-dialog">
                        <Form {...formItemLayout} >
                            <FormItem label="手机号码">
                                {getFieldDecorator('account', {rules: [{required: true, message: '手机号码不能为空'}]})(
                                    <Input placeholder="请输入手机号码"/>
                                )}
                            </FormItem>
                            <FormItem label="密码">
                                {getFieldDecorator('password', {rules: [{required: true, message: '密码不能为空'}]})(
                                    <Input type="password" placeholder="请输入密码"
                                           autoComplete="off"/>
                                )}
                            </FormItem>
                        </Form>
                    </div>
                    <div className='login-contains-page-button'>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>
                            <Icon type="arrow-right"/>登录
                        </Button>
                    </div>
                </div>)}
            </section>
        );
    }
}


LoginPage = Form.create()(LoginPage);
export default LoginPage;
