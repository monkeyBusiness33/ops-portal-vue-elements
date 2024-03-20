import axios from "axios";
import { getAxiosBaseUrl, getChatApiToken } from "@/helpers/general";
import { getCSRFToken } from "@/helpers/cookie";
import websocketService from "@/services/chat/websocket-chat";

export const axiosBaseConfig = axios.create({
  baseURL: getAxiosBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    Authorization: import.meta.env.DEV ? `Bearer ${getChatApiToken()}` : undefined,
  },
});

axiosBaseConfig.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers['X-CSRFToken'] = getCSRFToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosBaseConfig.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    if (!window.navigator.onLine || error.code === "ERR_NETWORK") {
      websocketService.onErrorSocket.value = true;
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
