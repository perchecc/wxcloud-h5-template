import axios from "axios";
import { showFailToast } from "vant";

//创建axios的一个实例
var instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 接口统一代理域名
  timeout: 6000, //设置超时
  headers: {
    "Content-Type": "application/json;charset=UTF-8;",
    "Access-Control-Allow-Origin-Type": "*",
  },
});
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 若是有做鉴权token , 就给头部带上token
    // TODO
    // const token = window.localStorage.getItem("token");
    // token && (config.headers.Authorization = token);

    //若请求方式为post，则将data参数转为JSON字符串
    if (config.method === "POST") {
      config.data = JSON.stringify(config.data);
    }

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    showFailToast(error.data.error.message);
    return Promise.reject(error);
  }
);

//响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 204) {
      //响应成功
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    console.log(error);
    //响应错误
    if (error.response && error.response.status) {
      const status = error.response.status;
      console.log(status);
      switch (status) {
        case 400:
          showFailToast(
            "发出的请求有错误，服务器没有进行新建或修改数据的操作"
          );
          break;

        case 401:
          // Token失效
          // TODO
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
          // showFailToast(
          //   "token:登录失效==>" +
          //     error.response.status +
          //     ":" +
          //     store.state.Roles
          // );
          // storage.remove(store.state.Roles);
          // storage.get(store.state.Roles);
          // router.replace({
          //   path: "/Login",
          // });
          break;

        case 403:
          showFailToast("用户得到授权，但是访问是被禁止的");
          break;
        case 404:
          showFailToast("网络请求不存在");
          break;
        default:
          showFailToast("其他错误==>" + error.response.status);
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error.response);
  }
);
export default instance;
