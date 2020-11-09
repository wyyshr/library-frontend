import * as React from 'react';
import { Line } from '@ant-design/charts';
import { ajax, path } from '../../../../config/config';
import './index.scss'

const OrderLine: React.FC = () => {
  const [list, setList] = React.useState([])
  const getDailyOrder = () => {
    ajax.get(path.getDailyOrder).then(res => {
      setList(res as any)
    })
  }
  React.useEffect(() => {
    getDailyOrder()
  },[])
  const config = {
    data: list,
    xField: 'date',
    yField: 'count',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2,
      },
    },
  }
  return (
    <div className="line_page">
      <div className="title">每日订单数量</div>
      {list.length != 0 ? <Line {...config} /> : <div className='noData'>暂无数据</div>}
    </div>
  )
}
export default OrderLine