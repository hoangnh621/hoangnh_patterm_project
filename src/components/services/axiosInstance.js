import axios from 'axios'
import { BASE_URL } from '../configs/axiosConfig'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer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',
  },
})
