import { Table, Button, Modal, InputNumber, message } from 'antd';
import * as React from 'react';
import { ajax, path } from '../../../config/config';
import { PlusOutlined } from "@ant-design/icons";
import './Seat.scss'

export interface SeatProps {
  
}
 
export interface SeatState {
  pageSize: number
  current: number
  data: Array<SeatItemType>
  total: number
  isShowAddBtnModal: boolean
  roomNum: number
  seatNum: number
  isShowDelSeatModal: boolean
  deleteSeatId: number
}
type SeatItemType = {
  id: number
  chooseTime1: string
  chooseTime2: string
  date1: string
  date2: string
  isOrder: boolean
  roomNum: number
  seatNum: number
}
 
class Seat extends React.Component<SeatProps, SeatState> {
  constructor(props: SeatProps) {
    super(props);
    this.state = {
      pageSize: 6,
      current: 1,
      data: [],
      total: 6,
      isShowAddBtnModal: false,
      roomNum: 1,
      seatNum: 1,
      isShowDelSeatModal: false,
      deleteSeatId: 0
    };
  }
  componentDidMount() {
    this.getSeat()
  }
  // 获取座位
  getSeat = async () => {
    const { pageSize, current } = this.state
    const res = await ajax.get(path.getAllSeat, {pageSize, current})
    this.setState({data: (res as any).list, total: (res as any).total})
  }
  // 分页
  handlePageChange = (current: number) => this.setState({current}, () => {this.getSeat()})
  // 房间号输入
  handleRoomNumChange = (roomNum: any) => this.setState({roomNum})
  // 座位号输入
  handleSeatNumChange = (seatNum: any) => this.setState({seatNum})
  // 添加座位
  handleAdd = async () => {
    const { roomNum, seatNum } = this.state
    const res = await ajax.get(path.addSeat,{roomNum, seatNum})
    if(res as any == 'error') return message.error('该座位已存在')
    message.success('添加成功')
    this.setState({isShowAddBtnModal: false}, () => {this.getSeat()})
  }
  // 删除座位
  handleDelete = async () => {
    const { deleteSeatId } = this.state
    const res = await ajax.delete(path.deleteSeat,{ id: deleteSeatId })
    if(res as any == 'success') {
      this.setState({isShowDelSeatModal: false}, () => {this.getSeat()})
      message.success('删除成功')
    }else{
      message.error('删除失败')
    }
  }
  render() { 
    const { data, pageSize, current, total, isShowAddBtnModal, roomNum, seatNum, isShowDelSeatModal } = this.state
    const columns = [
      {
        title: '房间号',
        dataIndex: 'roomNum',
        key: 'roomNum'
      },
      {
        title: '座位号',
        dataIndex: 'seatNum',
        key: 'seatNum'
      },
      {
        title: '预约情况',
        dataIndex: 'isOrder',
        key: 'isOrder',
        render: (text: boolean) => text ? '已被预约' : <span style={{color: '#a8a8a8'}}>未被预约</span>
      },
      {
        title: '今日预约时间段',
        dataIndex: 'chooseTime1',
        key: 'chooseTime1',
        render: (text: string) => text ? text : <span style={{color: '#a8a8a8'}}>暂无预约</span>
      },
      {
        title: '明日预约时间段',
        dataIndex: 'chooseTime2',
        key: 'chooseTime2',
        render: (text: string) => text ? text : <span style={{color: '#a8a8a8'}}>暂无预约</span>
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: SeatItemType) => <Button type="default" onClick={()=>this.setState({isShowDelSeatModal: true, deleteSeatId: record.id})}>删除</Button>
      }
    ]
    return (
      <div className="seat_page">
        <div className="add_btn">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => this.setState({isShowAddBtnModal: true})}>添加座位</Button>
        </div>
        <Table 
          columns={columns}
          dataSource={data}
          rowKey={data=>data.id}
          pagination={{
            pageSize,
            current,
            total,
            onChange: this.handlePageChange
          }}
        />
        {/* 添加座位弹框 */}
        <Modal
          title="添加座位"
          visible={isShowAddBtnModal}
          onOk={this.handleAdd}
          onCancel={() => this.setState({isShowAddBtnModal: false})}
          footer={[
            <Button key="back" type="default" onClick={() => this.setState({isShowAddBtnModal: false})}>取消</Button>,
            <Button key="submit" type="primary" onClick={this.handleAdd}>确认</Button>,
          ]}
        >
          <div style={{display: 'flex', justifyContent: 'flex-start'}}>
            <div style={{flex: '1'}}>房间号：<InputNumber defaultValue={roomNum} min={1} onChange={this.handleRoomNumChange} /></div>
            <div style={{flex: '1'}}>座位号：<InputNumber defaultValue={seatNum} min={1} onChange={this.handleSeatNumChange} /></div>
          </div>
        </Modal>
        {/* 删除座位弹框 */}
        <Modal
          title="删除座位"
          visible={isShowDelSeatModal}
          onOk={this.handleDelete}
          onCancel={()=>this.setState({isShowDelSeatModal: false})}
          footer={[
            <Button key="cancle" type="default" onClick={()=>this.setState({isShowDelSeatModal: false})}>取消</Button>,
            <Button key="sure" type="primary" onClick={this.handleDelete}>确认</Button>,
          ]}
        >
          <p>删除后不可恢复，确定删除吗？</p>
        </Modal>
      </div>
    );
  }
}
 
export default Seat;