import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (t) => {
  token = `bearer ${t}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async obj => {
  const config = {
    headers: { Authorization: token },
  }

  const { data } = await axios.post(baseUrl, obj, config)
  return data
}

export default {
  getAll,
  setToken,
  create,
}