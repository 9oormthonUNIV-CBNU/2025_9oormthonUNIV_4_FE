export const formatTimeAgo = (date) => {
  const now = new Date();
  const seoulOffset = 9 * 60; // Seoul is UTC+9
  const localOffset = now.getTimezoneOffset(); // Get the local time zone offset in minutes

  // Convert the input date to Seoul time
  const seoulTime = new Date(date.getTime() + (seoulOffset + localOffset) * 60000);
  const seconds = Math.floor((now.getTime() - seoulTime.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `${interval}년전`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval}개월전`;
  }
  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return `${interval}주전`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval}일전`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval}시간전`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval}분전`;
  }
  return `${Math.floor(seconds)}초전`;
};
