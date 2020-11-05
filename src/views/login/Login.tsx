import * as React from 'react';
import { ajax, path } from '../../config/config';
import { Button } from "antd";
import './Login.scss'

export interface LoginProps {
  
}
 
export interface LoginState {
  
}
 
class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {

    };
  }
  delete = async () => {
    const res = await ajax.delete(path.deleteSeat,{
      id: 20
    })
    console.log(res);
    const res1 = await ajax.get(path.getAllSeat,{
      current: 2,
      pageSize: 5,
    })
    console.log(res1);
    
  }
  render() { 
    return (
      <div className="login_page">
        <Button onClick={this.delete}>测试</Button>
        <div className="left_part">
          {/* <img src="" alt=""/> */}
        </div>
        <div className="right_part"></div>
        
      </div>
    );
  }
}
 
export default Login;