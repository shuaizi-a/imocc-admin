import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant';
import { setItem, getItem } from '@/utils/storage';

/**
 * 设置时间戳
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now());
}

/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP);
}

/**
 * 是否超时
 */
export function isCheckTimeout() {
  // 当前时间戳
  var currentTime = Date.now();
  // 获取当前时间戳
  var timeStamp = getTimeStamp();
  // 判断 当前时间戳减去缓存时间戳是否大于设置的时间，大于 true 小于 false
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE;
}
