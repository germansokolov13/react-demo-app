import { AxiosInstance } from 'axios';
import { loginStore } from '../stores/user-profile';

export function withAuth(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(function (config) {
    const user = loginStore.getState().user;
    if (Date.now() < user.exp * 1000) {
      const token = loginStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      const logOut = loginStore.getState().logOut;
      logOut();
      console.error('No auth!');
    }
    return config;
  }, function (error) {
    if (error.status === 401) {
      const logOut = loginStore.getState().logOut;
      logOut();
      console.error('No auth!');
    }
    return Promise.reject(error);
  });

  return axiosInstance;
}
