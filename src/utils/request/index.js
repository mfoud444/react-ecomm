import request from './axios';

function http({
  url,
  data,
  method = 'GET',
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest,
}) {
  const successHandler = (res) => {
    if (typeof res.data === 'string') {
      return res.data;
    }
    return res.data;
  };

  const failHandler = (error) => {
    afterRequest && afterRequest();
    throw new Error(error?.message || 'Error');
  };

  beforeRequest && beforeRequest();

  const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {});

  switch (method.toUpperCase()) {
    case 'GET':
      return request
        .get(url, { params, signal, onDownloadProgress })
        .then(successHandler)
        .catch(failHandler);
    case 'POST':
      return request
        .post(url, params, { headers, signal, onDownloadProgress })
        .then(successHandler)
        .catch(failHandler);
    case 'PUT':
      return request
        .put(url, params, { headers, signal, onDownloadProgress })
        .then(successHandler)
        .catch(failHandler);
    case 'DELETE':
      return request
        .delete(url, { params, headers, signal, onDownloadProgress })
        .then(successHandler)
        .catch(failHandler);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}

export function get({
  url,
  data,
  method = 'GET',
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest,
}) {
  return http({
    url,
    method,
    data,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  });
}

export function post({
  url,
  data,
  method = 'POST',
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest,
}) {
  return http({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  });
}

export function put({
  url,
  data,
  method = 'PUT',
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest,
}) {
  return http({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  });
}

export function del({
  url,
  data,
  method = 'DELETE',
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest,
}) {
  return http({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  });
}

// Download function
export function download({
  url,
  data,
  method = 'GET',
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest,
}) {
  return http({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  }).then((response) => {
    const blob = new Blob([response], { type: 'application/octet-stream' });
    return Promise.resolve(blob);
  });
}

export default post;
