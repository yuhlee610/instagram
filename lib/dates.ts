import moment from 'moment';

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;
const SECONDS_PER_MONTH = SECONDS_PER_HOUR * 24 * 30;
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const formatPostCreatedAt = (createdAt: Date) => {
  const createdAtDiff = moment().diff(createdAt, 'seconds');

  if (createdAtDiff < SECONDS_PER_MINUTE) {
    return 'vừa xong';
  } else if (createdAtDiff < SECONDS_PER_HOUR) {
    return `${Math.ceil(createdAtDiff / SECONDS_PER_MINUTE)} phút`;
  } else if (createdAtDiff < SECONDS_PER_DAY) {
    return `${Math.ceil(createdAtDiff / SECONDS_PER_HOUR)} giờ`;
  } else if (createdAtDiff < SECONDS_PER_MONTH) {
    return `${Math.ceil(createdAtDiff / SECONDS_PER_MONTH)} ngày`;
  }

  return createdAt.toLocaleDateString('vi-VN', options);
};
