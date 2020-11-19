import * as React from 'react';
import './ScanCode.scss'
import { ajax, path } from '../../config/config';
import { Button, message, Typography } from "antd";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LoginOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ScanCode: React.FC<RouteComponentProps> = (props) => {
  /** state */
  const [codeUrl, setCodeUrl] = React.useState<string>('')

  const getScanCode = async () => {
    ajax.get(path.checkOrder) // 检查订单
    const res = await ajax.get(path.getScanCode)
    const url = res as any as string
    setCodeUrl(url)
    message.success('二维码更新成功')
  }

  // 每隔5分钟刷新二维码
  const timer = setInterval(() => {
    getScanCode();    // 获取二维码
  }, 300000);

  /** componentDidMount */
  React.useEffect(()=>{
    getScanCode()
    return () => {
      clearInterval(timer); // 清除定时器
    }
  },[])

  const imgUrl = "https://www.17sucai.com/preview/1257759/2018-12-25/%E6%88%91%E7%9A%84%E4%B9%A6%E5%B1%8B/img/bgImg.jpg"
  return (
    <div className="ScanCode">
      <img src={imgUrl} className="bgImg"/>
      <div className='tip'>温馨提示：扫码签到或签退时建议点击刷新二维码</div>
      <div className="goLogin">
        <Button type="primary" onClick={() => props.history.replace('/login')} icon={<LoginOutlined />}>去登录</Button>
      </div>
      <div className='title'><Title level={2} type='secondary'>图书馆签到签退二维码</Title></div>
      {/* 二维码 */}
      <div className="img_code"><img src={codeUrl} /></div>
      <div className="btn"><Button type='primary' onClick={getScanCode}>刷新二维码</Button></div>
    </div>
  )
}
 
export default withRouter(ScanCode as any);