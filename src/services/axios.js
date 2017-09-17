import Axios from 'axios'

/*
* Axios configured for Django REST API
*/

import { camelizeKeys } from '@/services/utils'

const axios = Axios.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
})

axios.interceptors.response.use(response => {
  response.data = camelizeKeys(response.data)
  return response
})

export default axios
