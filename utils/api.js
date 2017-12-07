import forEach from 'lodash/forEach'
import partial from 'lodash/partial'
import http from 'axios'
import urlComposer from 'url-composer'
import client from 'socket.io-client'
import sailsIO from 'sails.io.js'

class Api {
  config = {
    services: {
      login: {
        path: '/api/login',
        method: 'post'
      },
      list: {
        path: '/api/list',
        method: 'get'
      },
      signal: {
        path: '/api/signal',
        method: 'post'
      }
    }
  }

  constructor () {
    this.request = partial(this.sendRequest, this.xhrAdapter)
    this.socket = partial(this.sendRequest, this.socketAdapter)

    forEach(this.config.services, (service, name) => {
      this.request[name] = partial(this.request, name)
      this.socket[name] = partial(this.socket, name)
    })
  }

  setup () {
    this.io = sailsIO(client)
  }

  sendRequest = (adapter, serviceName, options = {}) => {
    const service = this.config.services[serviceName]
    const { params, query, data } = options

    if (!service) {
      throw new Error(`[api] Inexisting api service '${serviceName}'`)
    }

    const url = urlComposer.build({
      path: service.path,
      params,
      query
    })

    return adapter(service, url, data)
  }

  xhrAdapter (service, url, data) {
    return http({
      method: service.method || 'get',
      url,
      data,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      withCredentials: true
    })
  }

  socketAdapter = (service, url, data) => {
    return new Promise((resolve, reject) => {
      this.io.socket[service.method || 'get'](url, data, (data, res) => {
        if (res.statusCode === 200) resolve(data)
        else reject(res)
      })
    })
  }
}

const singleton = new Api()

export { singleton as api }
export default singleton
