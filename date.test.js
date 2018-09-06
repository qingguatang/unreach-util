import { format, friendly } from './date';


describe('date', () => {
  it('format date', () => {
    const d = new Date();
    const str = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    expect(format(d, 'YYYY-M-D')).toBe(str);

    expect(format('2017-5-5')).toBe('2017-05-05');
    expect(format('2017-5-5', 'YY-M-D')).toBe('17-5-5');
    expect(format('2017-12-3', 'YYYY年MM月DD日')).toBe('2017年12月03日');
  });

  it('format time', () => {
    const d = new Date('2018-9-3 18:23');
    expect(format(d)).toBe('2018-09-03');
    expect(format(d, 'HH:mm:ss')).toBe('18:23:00');
  });

  it('friendly', () => {
    const now = new Date();
    expect(friendly(now)).toBe(format(now, '今天 H:m'));

    const yestoday = new Date(now.getTime() - 3600 * 24 * 1000);
    expect(friendly(yestoday)).toBe(format(yestoday, '昨天 H:m'));

    const beforeYestoday = new Date(now.getTime() - 3600 * 48 * 1000);
    expect(friendly(beforeYestoday)).toBe(format(beforeYestoday, '前天 H:m'));

    const early = new Date('2010-7-2 18:12');
    expect(friendly(early)).toBe(format(early, 'YYYY年M月D日 H:m'));
  });
});
