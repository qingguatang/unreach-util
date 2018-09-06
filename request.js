import axios from 'axios';
import env from './env';

const serverHost = /(\.[-\w]+\.[-\w]+)$/.exec(window.location.hostname)[1];

export async function request({ method = 'get', scope, url, params, data }) {
  if (!url.startsWith('http')) {
    url = `${getHost(scope)}/api/${url}`;
  }
  if (method === 'get') {
    params = { ...params, ...data, _: Date.now() };
  }
  const res = await axios({
    method,
    url,
    params,
    data,
    withCredentials: true
  });
  return res.data;
}

export async function get(scope, url, params) {
  const res = await request({ scope, url, params, method: 'get' });
  return res.isSuccess && res.data;
}

export async function post(scope, url, data) {
  const res = await request({ scope, url, data, method: 'post' });
  return res.isSuccess;
}

export function postSync(scope, url, data) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', `${getHost(scope)}/api/${url}`, false);
  xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xmlhttp.send(JSON.stringify(data));
}

function getHost(scope) {
  return env === 'development' ?
    `https://${scope}.dev${serverHost}` :
    `https://${scope}${serverHost}`;
}

export default { request, get, post, postSync };
