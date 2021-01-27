import React, {Component} from 'react';
import {Button, Form, Icon, Input} from 'antd';
import Axios from '../../utils/ajaxUtil';
import imge_3 from '@/images/login/3.jpg';
import imge_4 from '@/images/login/4.jpg';
import imge_5 from '@/images/login/5.jpg';
import imge_6 from '@/images/login/6.jpg';

const FormItem = Form.Item;
let tempIndex = 1;

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgIndex: 0,
            pic: [
                {id: 1, key: 1, src: imge_3},
                {id: 2, key: 2, src: imge_4},
                {id: 3, key: 3, src: imge_5},
                {id: 4, key: 4, src: imge_6}
            ]
        };
        this.dragStart = this.dragStart.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.drop = this.drop.bind(this);

        //  移动的图片的index
        this.movedPicIndex = -1;
        //  移入的区域的index
        this.movedInIndex = -1;
    }

    //https://segmentfault.com/q/1010000019565763
    componentDidMount() {

    }

    // dragStart(el) {
    //     // this.className += ' dragging';
    //     // setTimeout(() => {
    //     //     this.className = 'invisible';
    //     // }, 0);
    //     console.log("el", el)
    //
    // }


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
        this.setState({imgIndex: index})
        document.getElementById('slider').src = imgSrc
    }

    allowDrop(e) {
        e.preventDefault();
    }

    drop(index, e) {
        e.preventDefault();
        this.movedInIndex = index;
        const picData = this.swapPic(this.movedPicIndex, this.movedInIndex);
        this.setState({
            pic: picData
        });
    }

    dragStart(index, e) {
        this.movedPicIndex = index;
    }

    swapPic(fromIndex, toIndex) {
        let picData = [...this.state.pic];
        [picData[fromIndex], picData[toIndex]] = [picData[toIndex], picData[fromIndex]];
        return picData;
    }

    render() {
        const {imgIndex, pic} = this.state;
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
                    {pic.map((item, index) => {
                        return (
                            <li
                                draggable={true}
                                onDragStart={e => this.dragStart(index, e)}
                                onDragOver={this.allowDrop}
                                onDrop={e => this.drop(index, e)}
                                key={item.key}>
                                <img src={item.src} onClick={() => this.imgSlider(item.src, index === 0 ? 1 : "")}/>
                            </li>
                        )
                    })}
                </ul>
                {imgIndex === 10 && (<div className='login-contains-page'>
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
