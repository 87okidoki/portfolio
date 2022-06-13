const sliceNumber = (no: string, _cnt: 2 | 3) => {
  if (no.length <= _cnt) {
    return no;
  }
  if (no.length <= 4 + _cnt) {
    return `${no.slice(0, _cnt)}-${no.slice(_cnt)}`;
  }
  if (no.length <= 6 + _cnt) {
    return `${no.slice(0, _cnt)}-${no.slice(_cnt, _cnt + 4)}-${no.slice(_cnt + 4)}`;
  }
  if (no.length === 7 + _cnt) {
    return `${no.slice(0, _cnt)}-${no.slice(_cnt, _cnt + 3)}-${no.slice(_cnt + 3)}`;
  }
  return `${no.substring(0, _cnt)}-${no.substring(_cnt, _cnt + 4)}-${no.substring(_cnt + 4)}`;
};
export const toMobileNo = (num: string) => {
  const no = num.replace(/\D/g, '');
  if (no.startsWith('1')) {
    if (no.length <= 4) {
      return no;
    }
    return `${no.slice(0, 4)}-${no.slice(4)}`;
  }
  if (no.startsWith('02')) {
    return sliceNumber(no, 2);
  }
  return sliceNumber(no, 3);
};

export const regexes = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  bizNo: /^\d{3}-\d{2}-\d{5}/,
  homepage: /^(http:\/\/|https:\/\/)(www\.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  mobileNo: /^\d{2,3}-\d{3,4}-\d{4}/,
};
export const validate = {
  email: (email: string) => regexes.email.test(email),
  bizNo: (bizNo: string) => regexes.bizNo.test(bizNo),
  homepage: (addr: string) => regexes.homepage.test(addr),
  mobileNo: (no: string) => regexes.mobileNo.test(no),
};
