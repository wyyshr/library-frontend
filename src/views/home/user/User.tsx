import { Button, Table, Modal, InputNumber, message } from 'antd';
import * as React from 'react';
import { ajax, path } from '../../../config/config';
import './User.scss'

type OrderType = {
  id: number
  account: string
  date: string
  startTime: string
  endTime: string
  isCome: boolean
  isLeave: boolean
  isViolate: boolean
  roomNum: number
  seatNum: number
  useTime: number
  userNum: number
}
type ViolateType = {
  id: number
  account: string
  times: number
  date: string
}
type UserType = {
  account: string
  order: Array<OrderType>
  violate?: ViolateType
}
export interface UserProps {
  
}
 
export interface UserState {
  data: UserType[],
  pageSize: number
  current: number
  total: number
  isChangeUserShow: boolean
  account: string
  violateTimes: number
}
 
class User extends React.Component<UserProps, UserState> {
  constructor(props: UserProps) {
    super(props);
    this.state = {
      data: [],
      pageSize: 7,
      current: 1,
      total: 7,
      isChangeUserShow: false,
      account: '',
      violateTimes: 0
    };
  }
  componentDidMount() {
    this.getUser()
  }
  // 获取用户信息
  getUser = async () => {
    const { pageSize, current } = this.state
    const res = await ajax.get(path.getUserInfo,{pageSize, current})
    this.setState({data: (res as any).list, total: (res as any).total})
  }
  // 分页
  handlePageChange = (current: number) => this.setState({current}, () => {this.getUser()});
  // 修改信息
  handleChange = async () => {
    const { account, violateTimes } = this.state
    const res = await ajax.post(path.changeUserViolate,{ account, times: violateTimes })
    if(res as any == 'success') {
      message.success('修改成功')
      this.setState({isChangeUserShow: false}, () => {
        this.getUser()
      })
    }else{
      message.error('修改失败')
    }
    
  }
  // 输入框
  handleInputChange = (e: any) => {
    this.setState({violateTimes: e})
  }
  render() { 
    const { data, pageSize, current, total, isChangeUserShow, account, violateTimes } = this.state
    const columns = [
      {
        title: '用户名',
        dataIndex: 'account',
        key: 'account'
      },
      {
        title: '预定次数',
        key: 'times',
        render: (text: any, record: UserType) => record.order.length!=0 ? 
        <span>{record.order.length}次</span> :
        <span style={{color: '#a8a8a8'}}>暂未预定</span>
      },
      {
        title: '违约次数',
        dataIndex: 'violate',
        key: 'violate',
        render: (text: ViolateType) => text ? <span>{text.times}次</span> : <span style={{color: '#a8a8a8'}}>暂无违约</span>
      },
      {
        title: '最近违约日期',
        dataIndex: 'violate',
        key: 'violateDate',
        render: (text: ViolateType) => text ? <span>{text.date.slice(0,-3)}</span> : <span style={{color: '#a8a8a8'}}>暂无违约日期</span>
      },
      {
        title: '操作',
        key: 'deleteUser',
        render: (text: any, record: UserType) => <Button type="default" onClick={()=>this.setState({isChangeUserShow: true, account: record.account, violateTimes: record.violate?.times || 0})}>设置违约</Button>
      }
    ]
    return (
      <div className="user_page">
        <Table 
          columns={columns}
          dataSource={data}
          rowKey={date=>date.account}
          pagination={{
            pageSize,
            current,
            total,
            onChange: this.handlePageChange
          }}
        />
        {/* 添加用户弹框 */}
        <Modal
          title="修改违约次数"
          visible={isChangeUserShow}
          onOk={this.handleChange}
          onCancel={() => this.setState({isChangeUserShow: false})}
          footer={[
            <Button key="back" type="default" onClick={() => this.setState({isChangeUserShow: false})}>取消</Button>,
            <Button key="submit" type="primary" onClick={this.handleChange}>确认</Button>,
          ]}
        >
          {account} 违约：
          <InputNumber min={0} onChange={this.handleInputChange} value={violateTimes} />
          <span style={{marginLeft: '10px'}}>次</span>
        </Modal>
      </div>
    );
  }
}
 
export default User;