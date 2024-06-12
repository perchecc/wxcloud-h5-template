import { axios } from "@/http/axios";
// TODO 示例代码
export const getToken = (data) => {
  return axios({
    url: "/ezo/getToken",
    data,
    method: "get",
    config: {
      timeout: 10000,
    },
  });
};
