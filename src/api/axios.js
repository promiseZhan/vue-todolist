import axios from "axios";
//API 请求地址

// 添加请求拦截器
axios.interceptors.request.use(
  req => {
    // 在发送请求之前做些什么
    return req;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    // 对响应数据做点什么
    return res;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
}

export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: data }).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
}
