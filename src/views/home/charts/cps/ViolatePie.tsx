import * as React from 'react';
import { Pie } from '@ant-design/charts';
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
const ViolatePie: React.FC = () => {
  const [orders, setOrders] = React.useState<OrderType[]>([])
  const getOrder = () => {
    ajax.get(path.getAllOrder).then(res => {
      setOrders(res as any)
    })
  }
  React.useEffect(() => {getOrder()},[])
  const normalOrders = orders.filter(v => v.isViolate)
  const _defineProperty = (obj: any, key: any, value: any) => {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  const data = [
    {
      type: '正常预约',
      value: normalOrders.length
    },
    {
      type: '违约订单',
      value: orders.length - normalOrders.length
    }
  ]
  const config = _defineProperty(
    {
      appendPadding: 10,
      data: data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      innerRadius: 0.64,
      label: {
        type: 'inner',
        offset: -35,
        autoRotate: false,
        content: '{value}',
        style: {
          fill: '#333',
          stroke: '#fff',
          strokeWidth: 1,
        },
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
      statistic: {
        title: {
          offsetY: -20,
          style: { fontSize: 26 },
          formatter: function formatter(datum: any) {
            return datum ? datum.type : '总计';
          },
        },
        content: {
          offsetY: 30,
          style: { fontSize: 44 },
          formatter: function formatter(datum: any, data: any) {
            return datum
              ? datum.value
              : data.reduce(function (r: any, d: any) {
                return r + d.value;
              }, 0)
          },
        },
      },
    },
    'interactions',
    [{ type: 'pie-statistic-active' }],
  );
  return (
    <div className="pie_page">
      <div className="title">预约订单数量</div>
      {orders.length != 0 ? <Pie {...config} /> : <div className='noData'>暂无数据</div>}
    </div>
  )
}
export default ViolatePie