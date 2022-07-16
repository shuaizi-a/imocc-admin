import request from '@/utils/request';

/*
 * 登陆
 */
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  });
};
