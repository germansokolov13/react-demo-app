import { AxiosInstance } from 'axios';
import { loginStore } from '../stores/login';

export function withAuth(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(
    (config) => {
      const { user } = loginStore.getState();
      const isStillValid = Date.now() < user.exp * 1000;
      if (isStillValid) {
        const { token } = loginStore.getState();
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        loginStore.getState().logOut();
        console.error('No auth!');
      }
      return config;
    },
    (error) => {
      if (error.status === 401) {
        loginStore.getState().logOut();
        console.error('No auth!');
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
