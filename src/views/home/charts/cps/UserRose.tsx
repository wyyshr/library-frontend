import * as React from 'react';
import { Rose } from '@ant-design/charts';
import { ajax, path } from '../../../../config/config';

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
type UserOrderType = {
  account: string
  order: OrderType[]
}
const UserRose: React.FC = () => {
  const [data, setData]  =React.useState<UserOrderType[]>([])
  const getUserInfo = async () => {
    const res = await ajax.get(path.getUserInfo)
    setData(res as any)
  }
  React.useEffect(() => {getUserInfo()},[])
  const sort = (a:any, b:any) => b.times - a.times
  const newData = data.map(v => {return {account: v.account,times: v.order.length}}).sort(sort);
  const config = {
    data: newData.slice(0,5),
    xField: 'account',
    yField: 'times',
    seriesField: 'account',
    radius: 0.9,
    label: { offset: -15 },
  };
  
  return (
    <div className="rose_page">
      <div className="title">预约排行（前5）</div>
      {data.length != 0 ? <Rose {...config} /> : <div className="noData">暂无数据</div>}
    </div>
  )
}
export default UserRose