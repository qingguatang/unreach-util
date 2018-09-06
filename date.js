/**
 * refer http://momentjs.com/docs/#/displaying/format/
 */
export function format(date, patern = 'YYYY-MM-DD') {
  date = toDate(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const map = {
    YY: ('' + year).substr(-2),
    YYYY: '' + year,
    M: '' + month,
    MM: ('0' + month).substr(-2),
    D: '' + day,
    DD: ('0' + day).substr(-2),
    H: '' + hour,
    HH: ('0' + hour).substr(-2),
    h: '' + (hour % 12),
    hh: ('0' + (hour % 12)).substr(-2),
    m: '' + minute,
    mm: ('' + minute).substr(-2),
    s: '' + second,
    ss: ('0' + second).substr(-2)
  };
  return patern.replace(/([a-zA-Z]+)/g, (_, p) => map[p] || p);
}


const ONE_DAY = 3600 * 24 * 1000;
export function friendly(date) {
  date = toDate(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const diff = today.getTime() - date.getTime();
  const diffDays = Math.floor(diff / ONE_DAY);
  const diffYears = today.getFullYear() - date.getFullYear();
  const labels = ['今天', '昨天', '前天'];
  const pattern = labels[diffDays] ||
        (diffYears === 0 ? 'M月D日' : 'YYYY年M月D日');
  return format(date, `${pattern} H:m`);
}


function toDate(date) {
  if (!date) {
    throw new Error('invalid date, receive null');
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date;
}


export default { format };
