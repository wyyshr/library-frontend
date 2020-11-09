import * as React from 'react';
import { Button, Layout, Menu, message, Modal } from 'antd';
import { BookOutlined, LogoutOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Link, Redirect, Route } from "react-router-dom";
import './Home.scss'
import Seat from './seat/Seat';
import User from './user/User';
import Charts from './charts/Charts';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Item } = Menu

export interface HomeProps extends RouteComponentProps {
  
}
 
export interface HomeState {
  selectedKeys: string[]
  visible: boolean
}
 
class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      selectedKeys: ['座位管理'],
      visible: false
    };
  }
  componentDidMount() {
    !this.props.location.state && this.props.history.replace('/login')
    this.props.location.pathname == '/home' && this.props.history.replace('/home/seat')
  }
  menuClick = (e: any) => {
    this.setState({selectedKeys: [e.key]})
  }
  onOk = () => {
    this.props.history.replace('/login');
    message.success('退出成功')
  }
  render() { 
    const { selectedKeys, visible } = this.state
    const leftSider = [{title: '座位管理', path: '/home/seat'}, {title: '用户信息', path: '/home/user'}, {title: '报表统计', path: '/home/charts'}]
    return (
      <div className="home_page">
        <Router>
          <Layout>
            <Header><BookOutlined style={{marginRight: '30px',fontSize: '30px'}} />图书馆后台管理</Header>
            <Layout>
              <Sider theme="light">
                <Menu mode="inline" selectedKeys={selectedKeys} onClick={this.menuClick}>
                  {leftSider.map(v => <Item key={v.title}><Link to={v.path}>{v.title}</Link></Item>)}
                </Menu>
              </Sider>
              <Content style={{padding: '24px'}}>
                <Route path="/home/seat" component={Seat} />
                <Route path="/home/user" component={User} />
                <Route path="/home/charts" component={Charts} />
                <Redirect to="/home/seat" />
              </Content>
            </Layout>
          </Layout>
        </Router>
        <div className="quit_btn"><Button type="default" icon={<LogoutOutlined />} onClick={() => this.setState({visible: true})}>退出登录</Button></div>
        <Modal
          title="退出登录"
          visible={visible}
          onOk={this.onOk}
          onCancel={() => this.setState({visible: false})}
          footer={[
            <Button key="back" type="default" onClick={() => this.setState({visible: false})}>取消</Button>,
            <Button key="submit" type="primary" onClick={this.onOk}>确认</Button>,
          ]}
        >
          确定退出吗？
        </Modal>
      </div>
    );
  }
}
 
export default withRouter(Home as any);