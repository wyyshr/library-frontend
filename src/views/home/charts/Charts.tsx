import * as React from 'react';
import './Charts.scss';
import { ajax, path } from '../../../config/config';
import ViolatePie from './cps/ViolatePie';
import OrderLine from './cps/OrderLine';
import UserRose from './cps/UserRose';


const Charts: React.FC = () => {

  return (
    <div className="charts_page">
      <div className="top">
        <div className="left"><ViolatePie /></div>
        <div className="right"><UserRose /></div>
      </div>
      <OrderLine />
    </div>
  );
}
 
export default Charts;