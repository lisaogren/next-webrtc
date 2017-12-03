import forEach from 'lodash/forEach'
import partial from 'lodash/partial'
import http from 'axios'
import urlComposer from 'url-composer'

const host = process.env.NODE_ENV === 'production'
  ? 'https://time-tracker.carlogren.com'
  : 'http://localhost:1337'
// const host = 'http://localhost:1337'

const config = {
  host,
  services: {
    login: {
      path: '/api/login',
      method: 'post'
    }
  }
}

function request (serviceName, options = {}) {
  const service = config.services[serviceName]
  const { params, query, data } = options

  if (!service) {
    throw new Error(`[api] Inexisting api service '${serviceName}'`)
  }

  const url = urlComposer.build({
    host: config.host,
    path: service.path,
    params,
    query
  })

  return http({
    method: service.method || 'get',
    url,
    data,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true
  })
}

const api = {
  request
}

forEach(config.services, (service, name) => {
  api[name] = partial(request, name)
})

if (typeof window !== 'undefined') window.api = api

export default api
