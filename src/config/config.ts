import axios from 'axios'

export const path = {
  getScanCode: '/user/getScanCode', // 获取签到签退二维码
  adminLogin: '/user/adminLogin', // 登录
  adminRegister: '/user/adminRegister', // 注册
  getUserInfo: '/user/getUserInfo', // 获取用户信息（预约记录）
  changeUserViolate: '/user/changeUserViolate', // 修改用户违约次数
  addSeat: '/seat/addSeat',   // 添加座位
  deleteSeat: '/seat/deleteSeat', // 删除座位
  getAllSeat: '/seat/getAllSeat', // 获取座位
  checkOrder: '/order/checkOrder', // 检查订单
  getAllOrder: '/order/getAllOrder', // 获取订单
  getDailyOrder: '/order/getDailyOrder', // 获取每日订单数量
}

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
})
// 请求拦截，一般用于页面添加请求时加载动画
instance.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err);
})
// 响应拦截，一般用于过滤出真正需要的信息
instance.interceptors.response.use((res) => {
  return res.data
}, err => {
  console.log(err);
})

export const ajax = {
  /**
 * GET 请求
 * @param url 请求路径
 * @param params 请求参数：{ }
 */
  get: (url: string, params?:{}) => instance.get(url,{params}),
  /**
 * POST 请求
 * @param url 请求路径
 * @param data 请求参数：{ }
 */
  post: (url: string, data?: {}) => instance.post(url,data),
  /**
 * PUT 请求
 * @param url 请求路径
 * @param data 请求参数：{ }
 */
  put: (url: string,data: {}) => instance.put(url,data),
  /**
 * DELETE 请求
 * @param url 请求路径
 * @param data 请求参数：{ }
 */
  delete: (url: string,data: {}) => instance.delete(url,{data})
}