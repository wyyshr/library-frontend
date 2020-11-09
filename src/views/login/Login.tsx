import * as React from 'react';
import { ajax, path } from '../../config/config';
import { Button, Input, Space, message } from "antd";
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import './Login.scss'
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface LoginProps extends RouteComponentProps {
  
}
 
export interface LoginState {
  goRegister: boolean
  username: string
  password: string
  password1: string
}
 
class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      goRegister: false,
      username: '',
      password: '',
      password1: ''
    };
  }
  
  login = async () => {
    const { goRegister, username, password, password1 } = this.state
    if(!username || !password) return message.error('用户名或密码不可为空')
    if(goRegister && password != password1) return message.error('两次输入密码不一致')
    const res = goRegister ? 
    await ajax.post(path.adminRegister,{ username, password }) :
    await ajax.post(path.adminLogin,{ username, password })
    const res1 = res as any as {type: string, msg: string}
    res1.type == 'error' && message.error(res1.msg)
    res1.type == 'success' && message.success(res1.msg)
    res1.msg == '登陆成功' && this.props.history.replace('/home',{username})
  }
  render() { 
    const { goRegister, username, password, password1 } = this.state
    const imgUrl = "https://www.17sucai.com/preview/1257759/2018-12-25/%E6%88%91%E7%9A%84%E4%B9%A6%E5%B1%8B/img/bgImg.jpg"
    return (
      <div className="login_page">
        <img src={imgUrl} className="bgImg"/>
        <div className="login_box_wrap">
          <div className="login_box">
            <div className="title">图书馆后台管理{goRegister?'注册':'登录'}</div>
            <Space size="large" direction="vertical">
              <Input 
                size="large" 
                placeholder="请输入用户名" 
                prefix={<UserOutlined />} 
                value={username}
                onChange={(e) => this.setState({username: e.target.value})}
              />
              <Input.Password 
                size="large" 
                placeholder="请输入密码" 
                prefix={<LockOutlined />} 
                value={password}
                onChange={(e) => this.setState({password: e.target.value})} 
              />
              {
                goRegister && <Input.Password 
                size="large" 
                placeholder="请再次输入密码" 
                prefix={<LockOutlined />} 
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
                value={password1}
                onChange={(e) => this.setState({password1: e.target.value})}
                />
              }
              <Button block type="primary" onClick={this.login}>{goRegister?'注册':'登录'}</Button>
              <Button type="link" onClick={() => this.setState({goRegister: !goRegister})}>{goRegister?"已有账户？去登录":'没有账户？去注册'}</Button>
            </Space>
          </div>
        </div>
      </div>
    );
  }
}
 
export default withRouter(Login as any);