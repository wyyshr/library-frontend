import * as React from 'react';
import './ScanCode.scss'
import { ajax, path } from '../../config/config';
import { Button, Typography } from "antd";

const { Title } = Typography;

const ScanCode: React.FC = () => {
  // state
  const [codeUrl, setCodeUrl] = React.useState<string>('')
  const [num, setNum] = React.useState(5)

  const getScanCode = async () => {
    // const res = await ajax.get(path.getScanCode)
    // const url = res as unknown as string
    // setCodeUrl(url)
    console.log('getScanCode');
  }

  // componentDidMount
  React.useEffect(()=>{
    getScanCode()
  },[])
  React.useEffect(() => {
    
  })
  // setInterval(() => { getScanCode() }, 300000);

  return (
    <div className="ScanCode">
      <div className='title'>
        <Title level={2} type='secondary'>图书馆签到签退二维码</Title>
      </div>
      {/* 二维码 */}
      <div className="img_code">
        <div style={{width: '400px', height: '400px',backgroundColor: '#ccc'}}>123456</div>
        {/* <img src={codeUrl} alt=""/> */}
      </div>
      <div>{num}</div>
    </div>
  )
}
 
export default ScanCode;