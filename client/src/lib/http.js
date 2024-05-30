import axios from 'axios'

// When building the client into a static file, we do not need to include the server path as it is returned by it
const domain = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'

const http = (url, { method = 'GET', data = undefined }) => {
  return axios({
    url: `${domain}${url}`,
    method,
    data,
  })
}

// Main functions to handle different types of endpoints
const get = (url, opts = {}) => http(url, { ...opts })
const post = (url, opts = {}) => http(url, { method: 'POST', ...opts })
const put = (url, opts = {}) => http(url, { method: 'PUT', ...opts })
const deleteData = (url, opts = {}) => http(url, { method: 'DELETE', ...opts })

const methods = {
  get,
  post,
  put,
  delete: deleteData,
}

export default methods