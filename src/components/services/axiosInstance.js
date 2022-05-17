import axios from 'axios'
import { BASE_URL } from '../configs/axiosConfig'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer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',
  },
})
